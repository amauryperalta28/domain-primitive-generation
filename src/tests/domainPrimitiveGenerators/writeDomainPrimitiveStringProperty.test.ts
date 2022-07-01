import { ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult } from './TemplateMatchers';

describe('writeDomainPrimitiveStringProperty.ts tests', () => {
  test('When string domain primitive property is generated should generate result template correctly', (done) => {
   const generatedTemplateFilePath  = `${__dirname}/templateTestResult/User/Names.cs`;
   const expectedTemplateFilePath = `${__dirname}//expectedTemplateResults/NamesStringProperty.cs`; 

    ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult(generatedTemplateFilePath, expectedTemplateFilePath, done);
  });

  test('When string domain primitive property is generated with min should generate result template correctly', (done) => {
    const generatedTemplateFilePath  = `${__dirname}/templateTestResult/User/NamesWithMin.cs`;
    const expectedTemplateFilePath = `${__dirname}//expectedTemplateResults/NamesStringPropertyWithMin.cs`; 
 
     ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult(generatedTemplateFilePath, expectedTemplateFilePath, done);
   });

   test('When string domain primitive property is generated with max should generate result template correctly', (done) => {
    const generatedTemplateFilePath  = `${__dirname}/templateTestResult/User/NamesWithMax.cs`;
    const expectedTemplateFilePath = `${__dirname}//expectedTemplateResults/NamesStringPropertyWithMax.cs`; 
 
     ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult(generatedTemplateFilePath, expectedTemplateFilePath, done);
   });

   test('When string domain primitive property is generated with min and max should generate result template correctly', (done) => {
    const generatedTemplateFilePath  = `${__dirname}/templateTestResult/User/NamesWithMinMax.cs`;
    const expectedTemplateFilePath = `${__dirname}//expectedTemplateResults/NamesStringPropertyWithMinMax.cs`; 
 
     ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult(generatedTemplateFilePath, expectedTemplateFilePath, done);
   });

   
   test('When string domain primitive property is generated with regex should generate result template correctly', (done) => {
    const generatedTemplateFilePath  = `${__dirname}/templateTestResult/User/NamesWithRegex.cs`;
    const expectedTemplateFilePath = `${__dirname}//expectedTemplateResults/NamesStringPropertyWithRegex.cs`; 
 
     ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult(generatedTemplateFilePath, expectedTemplateFilePath, done);
   });

});

