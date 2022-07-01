import { ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult } from './TemplateMatchers';

describe('writeDomainPrimitiveGuidProperty.ts tests', () => {
  test('When a required guid domain primitive property is generated should generate property template correctly', (done) => {
   const generatedTemplateFilePath  = `${__dirname}/templateTestResult/User/EmployeeId.cs`;
   const expectedTemplateFilePath = `${__dirname}//expectedTemplateResults/guid/IdGuidRequiredProperty.cs`; 

    ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult(generatedTemplateFilePath, expectedTemplateFilePath, done);
  });

});

