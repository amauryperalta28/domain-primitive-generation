import { ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult } from './TemplateMatchers';

describe('writeDomainPrimitiveStringProperty.ts tests', () => {
  test('When string domain primitive property is generated should generate result template correctly', (done) => {
   const generatedTemplateFilePath  = `${__dirname}/templateTestResult/User/Names.cs`;
   const expectedTemplateFilePath = `${__dirname}//expectedTemplateResults/string/NamesStringProperty.cs`; 

    ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult(generatedTemplateFilePath, expectedTemplateFilePath, done);
  });

  test('When string domain primitive property is generated with min should generate result template correctly', (done) => {
    const generatedTemplateFilePath  = `${__dirname}/templateTestResult/User/NamesWithMin.cs`;
    const expectedTemplateFilePath = `${__dirname}//expectedTemplateResults/string/NamesStringPropertyWithMin.cs`; 
 
     ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult(generatedTemplateFilePath, expectedTemplateFilePath, done);
   });

   test('When string domain primitive property is generated with max should generate result template correctly', (done) => {
    const generatedTemplateFilePath  = `${__dirname}/templateTestResult/User/NamesWithMax.cs`;
    const expectedTemplateFilePath = `${__dirname}//expectedTemplateResults/string/NamesStringPropertyWithMax.cs`; 
 
     ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult(generatedTemplateFilePath, expectedTemplateFilePath, done);
   });

   test('When string domain primitive property is generated with min and max should generate result template correctly', (done) => {
    const generatedTemplateFilePath  = `${__dirname}/templateTestResult/User/NamesWithMinMax.cs`;
    const expectedTemplateFilePath = `${__dirname}//expectedTemplateResults/string/NamesStringPropertyWithMinMax.cs`; 
 
     ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult(generatedTemplateFilePath, expectedTemplateFilePath, done);
   });

   
   test('When string domain primitive property is generated with regex should generate result template correctly', (done) => {
    const generatedTemplateFilePath  = `${__dirname}/templateTestResult/User/NamesWithRegex.cs`;
    const expectedTemplateFilePath = `${__dirname}//expectedTemplateResults/string/NamesStringPropertyWithRegex.cs`; 
 
     ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult(generatedTemplateFilePath, expectedTemplateFilePath, done);
   });
   
   test('When string domain primitive property is generated with regex and min should generate result template correctly', (done) => {
    const generatedTemplateFilePath  = `${__dirname}/templateTestResult/User/NamesWithRegexMin.cs`;
    const expectedTemplateFilePath = `${__dirname}//expectedTemplateResults/string/NamesStringPropertyWithRegexMin.cs`; 
 
     ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult(generatedTemplateFilePath, expectedTemplateFilePath, done);
   });

   test('When string domain primitive property is generated with regex and max should generate result template correctly', (done) => {
    const generatedTemplateFilePath  = `${__dirname}/templateTestResult/User/NamesWithRegexMax.cs`;
    const expectedTemplateFilePath = `${__dirname}//expectedTemplateResults/string/NamesStringPropertyWithRegexMax.cs`; 
 
     ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult(generatedTemplateFilePath, expectedTemplateFilePath, done);
   });

   test('When string domain primitive property is generated with regex min and max should generate result template correctly', (done) => {
    const generatedTemplateFilePath  = `${__dirname}/templateTestResult/User/NamesWithRegexMinMax.cs`;
    const expectedTemplateFilePath = `${__dirname}//expectedTemplateResults/string/NamesStringPropertyWithRegexMinMax.cs`; 
 
     ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult(generatedTemplateFilePath, expectedTemplateFilePath, done);
   });

});

