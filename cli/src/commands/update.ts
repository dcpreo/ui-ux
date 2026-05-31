import { execSync } from 'node:child_process';
import chalk from 'chalk';
import ora from 'ora';
import { getLatestRelease } from '../utils/github.js';
import { logger } from '../utils/logger.js';

export async function updateCommand(): Promise<void> {
  logger.title('UI/UX Pro Max Updater');

  const spinner = ora('Checking latest version...').start();

  try {
    const release = await getLatestRelease();
    const latest = release.tag_name;
    spinner.succeed(`Latest release: ${chalk.cyan(latest)}`);
  } catch {
    spinner.warn('Could not fetch latest release info. Proceeding with update anyway.');
  }

  console.log();
  logger.info('Updating uipro-cli via npm...');
  console.log();

  try {
    execSync('npm install -g uipro-cli@latest', { stdio: 'inherit' });
    console.log();
    logger.success('uipro-cli updated successfully!');
    console.log();
    console.log(chalk.bold('Next steps:'));
    console.log(chalk.dim('  Run: uipro init --ai <type> --force  to reinstall the skill'));
    console.log();
  } catch (error) {
    logger.error('npm install failed. Try manually: npm install -g uipro-cli@latest');
    if (error instanceof Error) {
      logger.error(error.message);
    }
    process.exit(1);
  }
}
