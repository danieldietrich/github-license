import * as githubLicense from '.';

describe('List of licenses', () => {

    test('Should load list of licenses', async () => {
        const licenses = await githubLicense();
        expect(licenses.length).toBeGreaterThan(0);
        licenses.split('\n').forEach(row => expect(row).toMatch(/^[a-zA-Z0-9.-]+\t.+$/));
    });
});

describe('MIT license', () => {

    test('Should load MIT license', async () => {
        expect(await githubLicense('MIT')).toMatch(/^MIT License/);
    });
});

describe('Non-existing license', () => {

    test('Should fail when spdx short identifier does not exist', async () => {
        await expect(githubLicense('XXX-0.0')).rejects.toThrowError(Error('404'));
    });

    test('Should fail when request path contains unescaped characters', async () => {
        await expect(githubLicense('💩')).rejects.toThrowError(Error('Request path contains unescaped characters'));
    });
});
