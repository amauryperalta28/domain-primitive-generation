import { TextWriter } from '@yellicode/core';
import { Generator } from '@yellicode/templating';
import { CreateDomainPrimitivesRequest } from './models';
import { validateRequest } from './helpers/validate-request';

Generator.generateFromModel(
  { outputFile: './result/entity.txt' },
  (writer: TextWriter, model: CreateDomainPrimitivesRequest) => {
    const validationResult = validateRequest(model);

    if (!validationResult.success) {
      throw new Error(validationResult.message);
    }

    writer.writeLine(
      `API description of, generated from 'domain-primitives-definition.json' at ${new Date().toISOString()}.`
    );
    // List GET paths
    writer.writeLine();
    writer.writeLine('my Properties:');
    for (const property in model.properties) {
      const value = model.properties[property];

      writer.writeLineIndented(`public ${value.name} { get; }`);
      writer.writeLineIndented(value.type);
    }
  }
);
