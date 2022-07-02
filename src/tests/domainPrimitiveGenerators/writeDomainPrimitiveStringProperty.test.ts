import { ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult } from './TemplateMatchers';

describe('writeDomainPrimitiveStringProperty.ts tests', () => {

   test.each([
    {generatedTemplateFilePath: `${__dirname}/templateTestResult/User/Names.cs`, 
    expectedTemplateFilePath: `${__dirname}/expectedTemplateResults/string/NamesStringProperty.cs`, 
    scenario: 'When string domain primitive property is generated should generate result template correctly'
   },
    {generatedTemplateFilePath: `${__dirname}/templateTestResult/User/NamesWithMin.cs`, 
    expectedTemplateFilePath: `${__dirname}/expectedTemplateResults/string/NamesStringPropertyWithMin.cs`, 
    scenario: 'When string domain primitive property is generated with min should generate result template correctly'
   },
    {generatedTemplateFilePath: `${__dirname}/templateTestResult/User/NamesWithMax.cs`, 
    expectedTemplateFilePath: `${__dirname}/expectedTemplateResults/string/NamesStringPropertyWithMax.cs`, 
    scenario: 'When string domain primitive property is generated with max should generate result template correctly'
   },
    {generatedTemplateFilePath: `${__dirname}/templateTestResult/User/NamesWithMinMax.cs`, 
    expectedTemplateFilePath: `${__dirname}/expectedTemplateResults/string/NamesStringPropertyWithMinMax.cs`, 
    scenario: 'When string domain primitive property is generated with min and max should generate result template correctly'
   },
    {generatedTemplateFilePath: `${__dirname}/templateTestResult/User/NamesWithRegex.cs`, 
    expectedTemplateFilePath: `${__dirname}/expectedTemplateResults/string/NamesStringPropertyWithRegex.cs`, 
    scenario: 'When string domain primitive property is generated with regex should generate result template correctly'
   },
    {generatedTemplateFilePath: `${__dirname}/templateTestResult/User/NamesWithRegexMin.cs`, 
    expectedTemplateFilePath: `${__dirname}/expectedTemplateResults/string/NamesStringPropertyWithRegexMin.cs`, 
    scenario: 'When string domain primitive property is generated with regex and min should generate result template correctly'
   },
    {generatedTemplateFilePath: `${__dirname}/templateTestResult/User/NamesWithRegexMax.cs`, 
    expectedTemplateFilePath: `${__dirname}/expectedTemplateResults/string/NamesStringPropertyWithRegexMax.cs`, 
    scenario: 'When string domain primitive property is generated with regex and max should generate result template correctly'
   },

    {generatedTemplateFilePath: `${__dirname}/templateTestResult/User/NamesWithRegexMinMax.cs`, 
     expectedTemplateFilePath: `${__dirname}/expectedTemplateResults/string/NamesStringPropertyWithRegexMinMax.cs`, 
     scenario: 'When string domain primitive property is generated with regex min and max should generate result template correctly'
    },
  ])('$scenario', ({generatedTemplateFilePath, expectedTemplateFilePath}, done: any) => {
    ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult(generatedTemplateFilePath, expectedTemplateFilePath, done);
    
  });

});

