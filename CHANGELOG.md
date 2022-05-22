# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.3](https://github.com/xiaojianzhong/jnu-jwxt-captcha-breaker/compare/v0.0.2...v0.0.3) (2020-02-19)

### [0.0.2](https://github.com/xiaojianzhong/jnu-jwxt-captcha-breaker/compare/v0.0.1...v0.0.2) (2020-02-15)

### Bug Fixes

- **image:** consider image processing in the real world ([8e50f09](https://github.com/xiaojianzhong/jnu-jwxt-captcha-breaker/commit/8e50f098635ec13c41381d6a99ca018f59cad531))
- **index:** enable function call `init()` ([8911d0e](https://github.com/xiaojianzhong/jnu-jwxt-captcha-breaker/commit/8911d0eec834a239a2ef67ceb69112e0be9d246b))
- **model:** remove tensorflow logging by setting an environment variable ([0b2a82a](https://github.com/xiaojianzhong/jnu-jwxt-captcha-breaker/commit/0b2a82a387d43353b131429669fc390d8dabef4c))

### 0.0.1 (2020-02-14)

### Features

- **cli:** add CLI ([da281dd](https://github.com/xiaojianzhong/jnu-jwxt-captcha-breaker/commit/da281dd7c195d6a1c1323ebf0d337339bccb7afc))
- **data:** add captcha data loader ([7146ba1](https://github.com/xiaojianzhong/jnu-jwxt-captcha-breaker/commit/7146ba1ad7142a46ebdba77391969549b2eeabe6))
- **executable:** add bin/jnucb.js as the executable file ([5ba5236](https://github.com/xiaojianzhong/jnu-jwxt-captcha-breaker/commit/5ba5236d788960baf9cf5bb665e4c51f583db8f8))
- **image:** add captcha image wrapper ([330686c](https://github.com/xiaojianzhong/jnu-jwxt-captcha-breaker/commit/330686c9d37c69cdb67f88da0808b6af2cad8ab1))
- **index:** add captcha breaker ([7bb1ece](https://github.com/xiaojianzhong/jnu-jwxt-captcha-breaker/commit/7bb1ece8ce90549fd677b95cff5220a9ac766c34))
- **label:** add label index convertor ([41896c4](https://github.com/xiaojianzhong/jnu-jwxt-captcha-breaker/commit/41896c458dfde5e6e4e1ab736e355ffd6548a13a))
- **logger:** add logger based on winston ([9091030](https://github.com/xiaojianzhong/jnu-jwxt-captcha-breaker/commit/90910309eb763e5421d13c500a8b780688c21fbb))
- **logger:** add test level in console logging ([e055f95](https://github.com/xiaojianzhong/jnu-jwxt-captcha-breaker/commit/e055f95e7010f53487d480a5c1bc06663bc8213a))
- **model:** add captcha image recognition model ([4199298](https://github.com/xiaojianzhong/jnu-jwxt-captcha-breaker/commit/41992985474b7707fecae451bb5885b0b78d7aa0))
- **util:** add collect() & parseFilename() utility functions ([5060029](https://github.com/xiaojianzhong/jnu-jwxt-captcha-breaker/commit/5060029d018d5b78e9e349959a6efa1dd3495a46))
- **util:** add diffBetween() utility function ([7c53e8e](https://github.com/xiaojianzhong/jnu-jwxt-captcha-breaker/commit/7c53e8e007d6c152417f92efa68e28d09728a1a4))
- **util:** add fill() utility function ([76717a2](https://github.com/xiaojianzhong/jnu-jwxt-captcha-breaker/commit/76717a24b9ffdf90ee318e6dc8e49539881b9aee))
- **vector:** add vector type definitions ([3fcb66f](https://github.com/xiaojianzhong/jnu-jwxt-captcha-breaker/commit/3fcb66fa8bf5822e1c4c586b2c37d1850ae9f337))

### Bug Fixes

- **cli:** remove `()` to refer attributes instead of functions ([cccee3b](https://github.com/xiaojianzhong/jnu-jwxt-captcha-breaker/commit/cccee3ba858f08a3c9dc09f27aa8b4db39da83f7))
- **cli:** remove the `--load-model` option ([da71de7](https://github.com/xiaojianzhong/jnu-jwxt-captcha-breaker/commit/da71de719d2c48e8cc76a1533ede5768ba6f56b3))
- **image:** correct margins defined by borders ([e088e8d](https://github.com/xiaojianzhong/jnu-jwxt-captcha-breaker/commit/e088e8d9da809d497daec89ce8a0288e8512a89a))
- **image:** use the correct method to load from buffer ([5541af6](https://github.com/xiaojianzhong/jnu-jwxt-captcha-breaker/commit/5541af66f52411488ae944b9315e938c9bf92c66))
- **model:** add `'object'` ([e415e3d](https://github.com/xiaojianzhong/jnu-jwxt-captcha-breaker/commit/e415e3dfb2f63e6a664aa08ce2a46d3f2f28009a))
