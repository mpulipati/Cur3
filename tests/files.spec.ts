import path from 'node:path';
import { expect, test } from '../src/fixtures/test-fixtures';

const filesDir = path.join(process.cwd(), 'src', 'testdata', 'files');

test.describe('File upload', () => {
  test('uploads a single file', async ({ homePage }) => {
    await homePage.files.uploadSingleFile(path.join(filesDir, 'sample.txt'));

    await expect(homePage.files.singleStatus).toContainText('sample.txt');
  });

  test('uploads multiple files', async ({ homePage }) => {
    await homePage.files.uploadMultipleFiles([
      path.join(filesDir, 'sample.txt'),
      path.join(filesDir, 'second.txt'),
    ]);

    await expect(homePage.files.multipleStatus).toContainText('sample.txt');
    await expect(homePage.files.multipleStatus).toContainText('second.txt');
  });
});
