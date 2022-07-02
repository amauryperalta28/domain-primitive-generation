import { ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult } from './TemplateMatchers';

describe('writeDomainPrimitiveEntity.ts tests', () => {
  test('When a domain primitive entity has one required property should generate entity template correctly', (done) => {
   const generatedTemplateFilePath  = `${__dirname}/templateTestResult/CitizenWithOneRequiredProperty/CitizenWithOneRequiredProperty.cs`;
   const expectedTemplateFilePath = `${__dirname}//expectedTemplateResults/entity/EntityWithOneRequiredProperty.cs`; 

    ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult(generatedTemplateFilePath, expectedTemplateFilePath, done);
  });

  test('When a domain primitive entity has one optional property should generate entity template correctly', (done) => {
    const generatedTemplateFilePath  = `${__dirname}/templateTestResult/CitizenWithOneOptionalProperty/CitizenWithOneOptionalProperty.cs`;
    const expectedTemplateFilePath = `${__dirname}//expectedTemplateResults/entity/EntityWithOneOptionalProperty.cs`; 
 
     ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult(generatedTemplateFilePath, expectedTemplateFilePath, done);
   });

   test('When a domain primitive entity has all supported property types required should generate entity template correctly', (done) => {
    const generatedTemplateFilePath  = `${__dirname}/templateTestResult/EntityWithAllSupportedPropertyTypesRequired/EntityWithAllSupportedPropertyTypesRequired.cs`;
    const expectedTemplateFilePath = `${__dirname}//expectedTemplateResults/entity/EntityWithAllSupportedPropertyTypesRequired.cs`; 
 
     ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult(generatedTemplateFilePath, expectedTemplateFilePath, done);
   });

   test('When a domain primitive entity has all supported property types optional should generate entity template correctly', (done) => {
    const generatedTemplateFilePath  = `${__dirname}/templateTestResult/EntityWithAllSupportedPropertyTypesOptional/EntityWithAllSupportedPropertyTypesOptional.cs`;
    const expectedTemplateFilePath = `${__dirname}//expectedTemplateResults/entity/EntityWithAllSupportedPropertyTypesOptional.cs`; 
 
     ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult(generatedTemplateFilePath, expectedTemplateFilePath, done);
   });

});

