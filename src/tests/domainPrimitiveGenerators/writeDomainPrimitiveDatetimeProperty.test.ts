import { ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult } from './TemplateMatchers';

describe('writeDomainPrimitiveDatetimeProperty.ts tests', () => {
  test('When a required datetime domain primitive property is generated should generate property template correctly', (done) => {
   const generatedTemplateFilePath  = `${__dirname}/templateTestResult/User/Birthday.cs`;
   const expectedTemplateFilePath = `${__dirname}//expectedTemplateResults/datetime/BirthDayDateTimeProperty.cs`; 

    ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult(generatedTemplateFilePath, expectedTemplateFilePath, done);
  });

});

