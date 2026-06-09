#!/usr/bin/env node

const fs = require('fs/promises');
const path = require('path');
const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');
const translations = require('./translations');

const rl = readline.createInterface({ input, output });

function color(code) {
  const paint = (value) => `\x1b[${code}m${value}\x1b[0m`;
  paint.bold = (value) => `\x1b[${code};1m${value}\x1b[0m`;
  return paint;
}

const terminal = {
  blue: color(34),
  cyan: color(36),
  gray: color(90),
  green: color(32),
  red: color(31),
  yellow: color(33),
};

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function copy(source, target) {
  await fs.cp(source, target, { recursive: true });
}

async function askList(question) {
  console.log(question.message);
  question.choices.forEach((choice, index) => {
    console.log(`  ${index + 1}. ${choice.name}`);
  });

  while (true) {
    const answer = (await rl.question('> ')).trim();
    const selectedIndex = Number(answer || '1') - 1;
    const selected = question.choices[selectedIndex];

    if (selected) {
      return selected.value;
    }

    console.log(terminal.yellow('Invalid option. Try again.'));
  }
}

async function askCheckbox(question) {
  console.log(question.message);
  question.choices.forEach((choice, index) => {
    console.log(`  ${index + 1}. ${choice.name}`);
  });
  console.log(terminal.gray('  Use comma-separated numbers, or "all".'));

  while (true) {
    const answer = (await rl.question('> ')).trim().toLowerCase();

    if (answer === 'all') {
      return question.choices.map((choice) => choice.value);
    }

    const selectedValues = answer
      .split(',')
      .map((item) => Number(item.trim()) - 1)
      .filter((index) => Number.isInteger(index) && question.choices[index])
      .map((index) => question.choices[index].value);

    if (selectedValues.length > 0 || answer === '') {
      return selectedValues;
    }

    console.log(terminal.yellow('Invalid option. Try again.'));
  }
}

async function askInput(question) {
  while (true) {
    const suffix = question.default ? ` (${question.default})` : '';
    const answer = await rl.question(`${question.message}${suffix}: `);
    const value = answer.trim() || question.default || '';
    const validation = question.validate ? question.validate(value) : true;

    if (validation === true) {
      return value;
    }

    console.log(terminal.yellow(validation));
  }
}

async function askConfirm(question) {
  const defaultText = question.default ? 'Y/n' : 'y/N';
  const answer = (await rl.question(`${question.message} (${defaultText}): `)).trim().toLowerCase();

  if (!answer) {
    return Boolean(question.default);
  }

  return answer === 'y' || answer === 'yes' || answer === 's' || answer === 'sim';
}

const prompts = {
  async prompt(questions) {
    const answers = {};

    for (const question of questions) {
      if (question.type === 'list') {
        answers[question.name] = await askList(question);
      } else if (question.type === 'checkbox') {
        answers[question.name] = await askCheckbox(question);
      } else if (question.type === 'confirm') {
        answers[question.name] = await askConfirm(question);
      } else {
        answers[question.name] = await askInput(question);
      }
    }

    return answers;
  },
};

async function setupTailwindConfig(projectRoot, componentsPath, t) {
  const tailwindConfigPath = path.join(projectRoot, 'tailwind.config.js');
  const tailwindConfigTemplate = path.join(__dirname, 'templates', 'tailwind.config.js');
  
  const relativeComponentsPath = path.relative(projectRoot, componentsPath);
  const contentPath = relativeComponentsPath.startsWith('..') 
    ? relativeComponentsPath 
    : `./${relativeComponentsPath}/**/*.{js,ts,jsx,tsx}`;

  if (await pathExists(tailwindConfigPath)) {
    const existingConfig = await fs.readFile(tailwindConfigPath, 'utf8');
    
    if (existingConfig.includes('border:') && existingConfig.includes('background:')) {
      if (!existingConfig.includes(relativeComponentsPath) && !existingConfig.includes(componentsPath)) {
        const updatedConfig = existingConfig.replace(
          /content:\s*\[([^\]]+)\]/,
          (match, content) => {
            const paths = content.split(',').map(p => p.trim().replace(/['"]/g, ''));
            if (!paths.some(p => p.includes(relativeComponentsPath) || p.includes(componentsPath))) {
              paths.push(`"${contentPath}"`);
            }
            return `content: [${paths.join(', ')}]`;
          }
        );
        await fs.writeFile(tailwindConfigPath, updatedConfig);
        console.log(terminal.green(`✓ ${t.tailwindConfigUpdated}`));
      } else {
        console.log(terminal.gray(`  ${t.tailwindConfigExists}`));
      }
    } else {
      console.log(terminal.yellow(`⚠️  ${t.tailwindConfigExistsButIncomplete}`));
      console.log(terminal.gray(`  ${t.manualConfigRequired}`));
    }
  } else {
    let configContent = await fs.readFile(tailwindConfigTemplate, 'utf8');
    configContent = configContent.replace(
      /content:\s*\[([^\]]+)\]/,
      `content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "${contentPath}",
  ]`
    );
    await fs.writeFile(tailwindConfigPath, configContent);
    console.log(terminal.green(`✓ ${t.tailwindConfigCreated}`));
  }
}

async function setupGlobalCSS(projectRoot, t) {
  const possibleCssFiles = [
    path.join(projectRoot, 'src', 'index.css'),
    path.join(projectRoot, 'src', 'global.css'),
    path.join(projectRoot, 'src', 'app.css'),
    path.join(projectRoot, 'src', 'main.css'),
    path.join(projectRoot, 'src', 'styles.css'),
  ];

  let cssFile = null;
  for (const file of possibleCssFiles) {
    if (await pathExists(file)) {
      cssFile = file;
      break;
    }
  }

  const cssTemplate = path.join(__dirname, 'templates', 'global.css');
  const templateContent = await fs.readFile(cssTemplate, 'utf8');

  if (cssFile) {
    const existingContent = await fs.readFile(cssFile, 'utf8');
    
    if (existingContent.includes('--background:') && existingContent.includes('--foreground:')) {
      console.log(terminal.gray(`  ${t.cssFileExists}`));
    } else {
      if (!existingContent.includes('@tailwind base')) {
        const updatedContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

${existingContent}

${templateContent.split('@tailwind').slice(1).join('@tailwind')}`;
        await fs.writeFile(cssFile, updatedContent);
        console.log(terminal.green(`✓ ${t.cssFileUpdated}`));
      } else {
        const layerBaseMatch = existingContent.match(/@layer base\s*\{[^}]*\}/);
        if (layerBaseMatch) {
          const updatedContent = existingContent.replace(
            /@layer base\s*\{/,
            `@layer base {\n${templateContent.match(/@layer base\s*\{([\s\S]*)\}/)[1]}`
          );
          await fs.writeFile(cssFile, updatedContent);
          console.log(terminal.green(`✓ ${t.cssFileUpdated}`));
        } else {
          const updatedContent = existingContent + '\n\n' + templateContent.split('@tailwind').slice(1).join('@tailwind');
          await fs.writeFile(cssFile, updatedContent);
          console.log(terminal.green(`✓ ${t.cssFileUpdated}`));
        }
      }
    }
  } else {
    const defaultCssPath = path.join(projectRoot, 'src', 'index.css');
    await fs.writeFile(defaultCssPath, templateContent);
    console.log(terminal.green(`✓ ${t.cssFileCreated}`));
    console.log(terminal.yellow(`  ${t.importCssInMain}: import './index.css'`));
  }
}

const componentsStructure = {
  'Forms': [
    { value: 'button', category: 'forms' },
    { value: 'input', category: 'forms' },
    { value: 'select', category: 'forms' },
    { value: 'checkbox', category: 'forms' },
    { value: 'toggle', category: 'forms' },
    { value: 'date-picker', category: 'forms' },
  ],
  'Feedback': [
    { value: 'modal', category: 'feedback' },
    { value: 'dialog', category: 'feedback' },
    { value: 'status-badge', category: 'feedback' },
    { value: 'badge', category: 'feedback' },
    { value: 'progress-bar', category: 'feedback' },
    { value: 'skeleton', category: 'feedback' },
    { value: 'theme-toggle', category: 'feedback' },
    { value: 'dropdown-menu', category: 'feedback' },
    { value: 'command', category: 'feedback' },
    { value: 'toast', category: 'feedback' },
    { value: 'toast-context', category: 'feedback' },
  ],
  'Layout': [
    { value: 'avatar', category: 'layout' },
    { value: 'metric-card', category: 'layout' },
    { value: 'paginated-table', category: 'layout' },
    { value: 'docs-sidebar', category: 'layout' },
    { value: 'navigation', category: 'layout' },
    { value: 'tabs', category: 'layout' },
    { value: 'separator', category: 'layout' },
    { value: 'accordion', category: 'layout' },
    { value: 'card', category: 'layout' },
    { value: 'sheet', category: 'layout' },
  ],
  'Charts': [
    { value: 'bar-chart', category: 'charts' },
    { value: 'donut-chart', category: 'charts' },
    { value: 'line-chart', category: 'charts' },
  ],
};

function getComponents(lang) {
  const t = translations[lang].components;
  const components = {};
  
  Object.keys(componentsStructure).forEach(categoryKey => {
    const categoryName = t[categoryKey] || categoryKey;
    components[categoryName] = componentsStructure[categoryKey].map(comp => ({
      name: t[comp.value].name,
      value: comp.value,
      description: t[comp.value].description,
      category: comp.category
    }));
  });
  
  return components;
}

async function main() {
  const { language } = await prompts.prompt([
    {
      type: 'list',
      name: 'language',
      message: 'Select language / Seleccione idioma / Selecione idioma:',
      choices: [
        { name: '🇧🇷 Português', value: 'pt' },
        { name: '🇺🇸 English', value: 'en' },
        { name: '🇪🇸 Español', value: 'es' },
      ],
    },
  ]);

  const t = translations[language];
  
  const technology = 'react';

  const components = getComponents(language);
  const categoryKeys = Object.keys(componentsStructure);

  console.log(terminal.blue.bold(`\n🎨 ${t.title}\n`));

  const { installMode } = await prompts.prompt([
    {
      type: 'list',
      name: 'installMode',
      message: t.installMode,
      choices: [
        { name: t.installModeChoices.category, value: 'category' },
        { name: t.installModeChoices.individual, value: 'individual' },
        { name: t.installModeChoices.all, value: 'all' },
      ],
    },
  ]);

  let selectedComponents = [];

  if (installMode === 'all') {
    Object.values(components).forEach(category => {
      selectedComponents.push(...category.map(c => ({ value: c.value, category: c.category })));
    });
  } else if (installMode === 'category') {
    const categories = Object.keys(components);
    const { selectedCategories } = await prompts.prompt([
      {
        type: 'checkbox',
        name: 'selectedCategories',
        message: t.selectCategories,
        choices: categories.map(cat => ({
          name: `${cat} (${components[cat].length} ${language === 'en' ? 'components' : language === 'es' ? 'componentes' : 'componentes'})`,
          value: cat,
        })),
      },
    ]);

    selectedCategories.forEach(category => {
      selectedComponents.push(...components[category].map(c => ({ value: c.value, category: c.category })));
    });
  } else {
    const allComponents = [];
    Object.entries(components).forEach(([category, items]) => {
      items.forEach(item => {
        allComponents.push({
          name: `${item.name} - ${item.description} (${category})`,
          value: item.value,
          category: item.category,
        });
      });
    });

    const { selected } = await prompts.prompt([
      {
        type: 'checkbox',
        name: 'selected',
        message: t.selectComponents,
        choices: allComponents.map(c => ({ name: c.name, value: c.value })),
        pageSize: 15,
      },
    ]);

    selectedComponents = selected.map(compValue => {
      const comp = allComponents.find(c => c.value === compValue);
      return { value: compValue, category: comp.category };
    });
  }

  if (selectedComponents.length === 0) {
    console.log(terminal.yellow(`\n⚠️  ${t.noComponentsSelected}\n`));
    return;
  }

  const defaultPath = './src/components/ui';
    
  const { installPath } = await prompts.prompt([
    {
      type: 'input',
      name: 'installPath',
      message: t.whereInstall,
      default: defaultPath,
      validate: (input) => {
        if (!input.trim()) {
          return t.pathEmpty;
        }
        return true;
      },
    },
  ]);

  const compCount = selectedComponents.length;
  console.log(terminal.green(`\n📦 ${t.selectedComponents} (${compCount}):`));
  selectedComponents.forEach(comp => {
    const compName = typeof comp === 'object' ? comp.value : comp;
    console.log(terminal.gray(`   - ${compName}`));
  });
  console.log(terminal.cyan(`\n📁 ${t.path}: ${installPath}\n`));

  const { confirm } = await prompts.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: t.confirmInstall,
      default: true,
    },
  ]);

  if (!confirm) {
    console.log(terminal.yellow(`\n❌ ${t.installCancelled}\n`));
    return;
  }

  console.log(terminal.blue(`\n🚀 ${t.installing}\n`));

  try {
    const possibleSourceDirs = [
      path.join(__dirname, '..', 'src', 'components'),
      path.join(__dirname, '..', 'packages', technology, 'src', 'components'),
      path.join(process.cwd(), 'node_modules', 'ui-valk', 'src', 'components'),
      path.join(__dirname, '..', 'node_modules', 'valk-ui', 'packages', technology, 'src', 'components'),
      path.join(process.cwd(), 'node_modules', 'valk-ui', 'packages', technology, 'src', 'components')
    ];
    
    let sourceDir = null;
    for (const dir of possibleSourceDirs) {
      if (await pathExists(dir)) {
        sourceDir = dir;
        break;
      }
    }
    
    if (!sourceDir) {
      throw new Error(`Source directory not found. Tried: ${possibleSourceDirs.join(', ')}`);
    }
    
    const targetDir = path.resolve(installPath);
    
    await ensureDir(targetDir);

    const possibleUtilsDirs = [
      path.join(__dirname, '..', 'src', 'lib'),
      path.join(__dirname, '..', 'packages', technology, 'src', 'lib'),
      path.join(process.cwd(), 'node_modules', 'ui-valk', 'src', 'lib'),
      path.join(__dirname, '..', 'node_modules', 'valk-ui', 'packages', technology, 'src', 'lib'),
      path.join(process.cwd(), 'node_modules', 'valk-ui', 'packages', technology, 'src', 'lib')
    ];
    
    let utilsSource = null;
    for (const dir of possibleUtilsDirs) {
      if (await pathExists(dir)) {
        utilsSource = dir;
        break;
      }
    }
    
    if (utilsSource) {
      const utilsTarget = path.resolve(installPath, '..', 'lib');
      await copy(utilsSource, utilsTarget);
      console.log(terminal.green(`✓ ${t.utilsCopied}`));
    }

    const installedComponents = [];
    
    for (const component of selectedComponents) {
      const compValue = typeof component === 'object' ? component.value : component;
      const compCategory = typeof component === 'object' ? component.category : null;
      
      let sourceCategoryDir = sourceDir;
      if (compCategory) {
        sourceCategoryDir = path.join(sourceDir, compCategory);
      } else {
        for (const [catName, catItems] of Object.entries(componentsStructure)) {
          const found = catItems.find(item => item.value === compValue);
          if (found) {
            sourceCategoryDir = path.join(sourceDir, found.category);
            break;
          }
        }
      }
      
      const componentFile = `${compValue}.tsx`;
      const sourceFile = path.join(sourceCategoryDir, componentFile);
      
      const targetCategoryDir = compCategory ? path.join(targetDir, compCategory) : targetDir;
      await ensureDir(targetCategoryDir);
      const targetFile = path.join(targetCategoryDir, componentFile);

      if (await pathExists(sourceFile)) {
        await copy(sourceFile, targetFile);
        const categoryLabel = compCategory || t.root;
        console.log(terminal.green(`✓ ${compValue} ${t.componentInstalled} ${categoryLabel}`));
        installedComponents.push({ value: compValue, category: compCategory });
      } else {
        console.log(terminal.red(`✗ ${compValue} ${t.componentNotFound} ${sourceCategoryDir}`));
      }
    }

    const categories = {};
    installedComponents.forEach(comp => {
      if (!categories[comp.category || 'root']) {
        categories[comp.category || 'root'] = [];
      }
      categories[comp.category || 'root'].push(comp.value);
    });

    for (const [category, comps] of Object.entries(categories)) {
      const categoryDir = category === 'root' ? targetDir : path.join(targetDir, category);
      const indexPath = path.join(categoryDir, 'index.ts');
      const indexContent = comps
        .map(comp => {
          const compName = comp.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
          return `export { ${compName} } from './${comp}'`;
        })
        .join('\n');

      await fs.writeFile(indexPath, indexContent + '\n');
      const categoryLabel = category === 'root' ? t.root : category;
      console.log(terminal.green(`✓ ${t.indexCreated} ${categoryLabel}`));
    }

    const mainIndexPath = path.join(targetDir, 'index.ts');
    const mainIndexContent = Object.entries(categories)
      .map(([category, comps]) => {
        if (category === 'root') {
          return comps.map(comp => {
            const compName = comp.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
            return `export { ${compName} } from './${comp}'`;
          }).join('\n');
        } else {
          return `export * from './${category}'`;
        }
      })
      .filter(Boolean)
      .join('\n');

    await fs.writeFile(mainIndexPath, mainIndexContent + '\n');
    console.log(terminal.green(`✓ ${t.mainIndexCreated}`));

    await setupTailwindConfig(process.cwd(), targetDir, t);
    
    await setupGlobalCSS(process.cwd(), t);

    console.log(terminal.green.bold(`\n✅ ${t.installComplete} ${installedComponents.length} ${t.componentsInstalled}\n`));
  } catch (error) {
    console.error(terminal.red(`\n❌ ${t.installError}`), error.message);
    process.exit(1);
  }
}

main()
  .catch(console.error)
  .finally(() => rl.close());
