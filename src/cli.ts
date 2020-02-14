import { Command } from 'commander';
import { collect } from './util';
import { CaptchaBreaker } from '.';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import logger from './logger';

/**
 * Run the core program with the command line arguments.
 *
 * @param {string[]} args
 */
export async function run(args: string[]): Promise<void> {
  const program = new Command();
  program.version('0.0.1');
  program
    .option(
      '--no-load-model',
      'whether NOT to load the model from the file system',
    )
    .option('-t, --train-model', 'whether to train the model')
    .option('-s, --save-model', 'whether to save the model to the file system')
    .option('--data-dir <data-dir>', 'directory to the training data')
    .option('--model-dir <model-dir>', 'directory to the pretrained model')
    .option(
      '--paths <paths>',
      'paths to the captcha image files (repeatable)',
      collect,
      [],
    )
    .option(
      '--dirs <dirs>',
      'directories to the captcha image files (repeatable)',
      collect,
      [],
    );
  program.parse(args);

  const {
    paths,
    dirs,
    dataDir,
    modelDir,
    loadModel,
    trainModel,
    saveModel,
  } = program;

  try {
    const breaker = new CaptchaBreaker();
    await breaker.init({
      loadModel,
      trainModel,
      saveModel,
      dataDir,
      modelDir,
    });

    for (const dir of dirs) {
      const filenames = readdirSync(dir);
      for (const filename of filenames) {
        paths.push(join(dir, filename));
      }
    }

    for (let i = 0; i < paths.length; i++) {
      if (!paths[i].endsWith('.png')) {
        paths.splice(i, 1);
      }
    }

    const results = [];
    for (const path of paths) {
      const buffer = readFileSync(path);

      try {
        const result = await breaker.parse(buffer);

        results.push({
          path,
          result,
        });
      } catch (e) {
        results.push({
          path,
          result: e.message(),
        });
      }
    }
    console.table(results);

    process.exit(0);
  } catch (e) {
    logger.error(e.message);

    process.exit(1);
  }
}
