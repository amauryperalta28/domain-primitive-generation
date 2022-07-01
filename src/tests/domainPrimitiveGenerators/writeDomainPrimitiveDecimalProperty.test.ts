import { ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult } from './TemplateMatchers';

/*
 with min
 with max
 with min and max
*/
describe('writeDomainPrimitiveDecimal.ts tests', () => {
  test('When a Decimal domain primitive property is generated should generate property template correctly', (done) => {
   const generatedTemplateFilePath  = `${__dirname}/templateTestResult/User/DecimalSalary.cs`;
   const expectedTemplateFilePath = `${__dirname}/expectedTemplateResults/decimal/DecimalSalaryProperty.cs`; 

    ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult(generatedTemplateFilePath, expectedTemplateFilePath, done);
  });

  test('When a Decimal domain primitive property is with min generated should generate property template correctly', (done) => {
    const generatedTemplateFilePath  = `${__dirname}/templateTestResult/User/DecimalSalaryMin.cs`;
    const expectedTemplateFilePath = `${__dirname}/expectedTemplateResults/decimal/DecimalSalaryMinProperty.cs`; 
 
     ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult(generatedTemplateFilePath, expectedTemplateFilePath, done);
   });

   test('When a Decimal domain primitive property is with max generated should generate property template correctly', (done) => {
    const generatedTemplateFilePath  = `${__dirname}/templateTestResult/User/DecimalSalaryMax.cs`;
    const expectedTemplateFilePath = `${__dirname}/expectedTemplateResults/decimal/DecimalSalaryMaxProperty.cs`; 
 
     ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult(generatedTemplateFilePath, expectedTemplateFilePath, done);
   });

   test('When a Decimal domain primitive property is with min and max generated should generate property template correctly', (done) => {
    const generatedTemplateFilePath  = `${__dirname}/templateTestResult/User/DecimalSalaryMinAndMax.cs`;
    const expectedTemplateFilePath = `${__dirname}/expectedTemplateResults/decimal/DecimalSalaryMinAndMaxProperty.cs`; 
 
     ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult(generatedTemplateFilePath, expectedTemplateFilePath, done);
   });

});

