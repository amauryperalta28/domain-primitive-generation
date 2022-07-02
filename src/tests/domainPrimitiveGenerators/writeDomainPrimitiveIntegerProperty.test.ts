import { ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult } from './TemplateMatchers';

describe('writeDomainPrimitiveInteger.ts tests', () => {
  test('When a integer domain primitive property is generated should generate property template correctly', (done) => {
   const generatedTemplateFilePath  = `${__dirname}/templateTestResult/User/IntegerId.cs`;
   const expectedTemplateFilePath = `${__dirname}/expectedTemplateResults/int/IntegerIdProperty.cs`; 

    ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult(generatedTemplateFilePath, expectedTemplateFilePath, done);
  });

  test('When a integer domain primitive property is with min generated should generate property template correctly', (done) => {
    const generatedTemplateFilePath  = `${__dirname}/templateTestResult/User/IntegerIdMin.cs`;
    const expectedTemplateFilePath = `${__dirname}/expectedTemplateResults/int/IntegerIdMinProperty.cs`; 
 
     ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult(generatedTemplateFilePath, expectedTemplateFilePath, done);
   });

   test('When a integer domain primitive property is with max generated should generate property template correctly', (done) => {
    const generatedTemplateFilePath  = `${__dirname}/templateTestResult/User/IntegerIdMax.cs`;
    const expectedTemplateFilePath = `${__dirname}/expectedTemplateResults/int/IntegerIdMaxProperty.cs`; 
 
     ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult(generatedTemplateFilePath, expectedTemplateFilePath, done);
   });

   test('When a integer domain primitive property is with min and max generated should generate property template correctly', (done) => {
    const generatedTemplateFilePath  = `${__dirname}/templateTestResult/User/IntegerIdMinAndMax.cs`;
    const expectedTemplateFilePath = `${__dirname}/expectedTemplateResults/int/IntegerIdMinAndMaxProperty.cs`; 
 
     ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult(generatedTemplateFilePath, expectedTemplateFilePath, done);
   });

});

