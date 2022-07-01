import * as fs from 'fs';

export const ExpectGeneratedPropertyFileToMatchWithExpectedTemplateResult = (generatedFilePath: string, templatePath: string, done: Function)=>{
    fs.readFile(generatedFilePath, 'utf8', function (_errFirst, generatedFile) {
      
      fs.readFile(
        templatePath,
        'utf8',
        function (_err, template) {
          done();
          expect(generatedFile).toBeDefined();
          expect(template).toBeDefined();
          expect(generatedFile).toEqual(template);
          
        }
      );
    });
  }