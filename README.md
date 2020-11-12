# Automated Testing with Jest

## Why testing is important?

-  Testing give you confident to make changes
-  Test help guide the design of your application
-  Testable apps is easier to maintenance

## What is Jest?

-  Jest is a testing framework developed by Facebook & open source contributors
-  Included in `create-react-app`
-  It works in React, Vue, Angular, etc

## How can i install Jest?

if you are already using CRA, then jest is automatically installed by default.

You can see it in `package.json` like this

```json
{
   "scripts": {
      "test": "jest"
   }
}
```

and run it with yarn

```bash
yarn test
```

or with npm

```bash
npm test
```

But if you not using CRA, you can install manually like this

```bash
yarn add --dev jest

or

npm install --save-dev jest
```

## Adding support for Advanced Testing

-  React Test Renderer

```bash
yarn add --dev react-test-renderer
```

-  Enzyme for Shallow Rendering

```bash
yarn add --dev enzyme
```

Jest automatically detect `*.test.` & `*.spec.js` file include in running testing, or it can run test file in **test** directory

## Customize Jest Configuration

In newest version of CRA you will get a basic configuration of jest in `jest.config.js`

```javascript
module.exports = {
   setupFilesAfterEnv: ['./src/setupTests.ts'],
}
```

`setupTest.js`

```javascript
import '@testing-library/jest-dom'
```

We import testing library so our text editor can recognize library for testing like jest-dom, etc.

For further configuration you can see the documentation [here](https://jestjs.io/docs/en/configuration)

# Configuration

## How can i run specific test?

You can do it with addition comment testNamePattern and fill it with your test name

```bash
jest --env=jsdom "--testNamePattern=nametest"
```

## Watching for Changes

-  Test will run automatically on every change
-  jest -watch
-  jest -watchAll

or with `create-react-app`

```bash
npm test or yarn test
react-script test -env=jsdom
```

## Writing tests

-  Jest are super easy to write
-  Use jest globals to group and define your tests
   -  describe (test suite)
   -  test/it
-  Setup your test environment
-  Use expect statement to assert test conditions

Example:

```javascript
describe('Business Case Approved', () => {
   const BusinessCaseContainer = () => (
      <BusinessCaseApproved>
         <p>Children case</p>
      </BusinessCaseApproved>
   )

   test('renders correctly', () => {
      const { container } = render(<BusinessCaseContainer />)
      expect(container).toBeInTheDocument()
   })

   test('children render succesfully', () => {
      const { getByText } = render(<BusinessCaseContainer />)
      const child = getByText('Children case')
      expect(child).toBeInTheDocument()
   })
})
```

## Test Environment

-  beforeAll()
-  beforeEach()
-  afterAll()
-  afterEach()
-  globalSetup()
-  globalTeardown()

## Basic Assertions

`expect()` is like you want to match return of the test. It can be a boolean, numbers, string, array, object and exceptions

-  Booleans: toBe(), toBeNull()
-  Numbers: toEqual()
-  Strings: toMatch()
-  Arrays: toContain()
-  Objects: toMatchObject()
-  Exceptions: toThrow()

# Mocks

## Using Jest Mocks

First of all what is a mocks?

-  Mimic real dependencies like a backend server
-  Capture calls
-  Provide canned responses

## Mocks in Jest

-  The jest object
-  The MIGHTY `jest.fn()`
-  Auto mocking with `__mocks__`

I will give an example how to mock a axios module (in this case we test a response of the API)

```javascript
import axios from 'axios'
jest.mock('axios')

const url = 'https://burger-builder-2c373.firebaseio.com/ingredients.json'

const fetchData = async () => {
   return await axios.get(url)
}

describe('Mocking API', () => {
   it('call ingredients api', async () => {
      const data = {
         bacon: 0,
         cheese: 0,
         meat: 1,
         salad: 0,
      }

      axios.get.mockImplementationOnce(() => Promise.resolve(data))
      await expect(fetchData()).resolves.toEqual(data)
   })

   it('fetches erroneously data from an API', async () => {
      const errorMessage = 'Network Error'

      axios.get.mockImplementationOnce(() =>
         Promise.reject(new Error(errorMessage))
      )
      await expect(fetchData()).rejects.toThrow(errorMessage)
   })
})
```

As you can see we try to expect the result of the fetch is equal to data.

# Test Coverage

## Coverage Reports with Jest

What is a test coverage?

-  Useful for Unit Test
-  All files are tested
-  All code path are tested

Test Coverage Pitfals

-  100% test coverage is not enough
-  Missing functionality cannot be covered
-  Unhandled errors
-  False positive

## Generating Coverage Reports

You can setup coverage via `jest.config.js`, `package.json`, or command line

-  collectCoverage(Boolean)
-  collectCoverageFrom(wildcard)
-  coverageReporters()

# Jest Does Snapshots

## Snapshot basic

-  Best for UI testing
-  Alternative to pixel-by-pixel comparison
-  Stored as text files
-  Lightweight and human readable

## Matching against snapshots

-  `expect(x).toMatchSnapshot()`
-  First match create a snapshot
-  Snapshots placed in `__snapshots__` directory

Example:
First we configure the enzyme

```javascript
import '@testing-library/jest-dom'

import 'jest-enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
```

after that in `snapshot.test.js`

```javascript
import React from 'react'
import { shallow } from 'enzyme'
import Header from '../HeaderTesting'

test('should test Header component', () => {
   const wrapper = shallow(<Header />)
   expect(wrapper).toMatchSnapshot()
})
```

## Updating snapshots

-  When the markup change, snapshot becomes invalid
-  Ensure the new state is valid
-  Prefer interactive mode
