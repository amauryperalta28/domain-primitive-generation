# Introduction 
Mono repo for "**Domain Primitive Generation**" software project. For ```Wepsys.Core 3.1.1```

# Getting Started

1. Clone this repo
2. Run command ```npm install```

# Build and Test

## Run ALL tests and see test coverage
```
npm test 
```

## Run ALL tests in watch mode and see test coverage
```
npm run test-watch
```

## Run template generation

From root (`~`) go to **GenerateEntityRequest** folder

Modify **domain-primitives-definition.json** to produce the needed result.

**Note that regex "\\" character should be scaped with "\\\\"** so the json file can take it.

```json
{
  "entities": [
    {
      "name": "User",
      "namespace": "RI.Novus.Core.Users",
      "properties": [
        { "name": "Id", "type": "guid", "isOptional": false },
        { "name": "Names", "type": "string", "isOptional": false, "min": 1, "max": 50 },
        { "name": "Domain", "type": "string", "isOptional": false, "min": 1, "max": 50, "regex": "^((?!-))(xn--)?[a-zA-Z0-9][a-zA-Z0-9-_]{0,61}[a-zA-Z0-9]{0,1}\\.(xn--)?([a-zA-Z0-9\\-]{1,61}|[a-zA-Z0-9-]{1,30}\\.[a-zA-Z]{2,})$" },
        { "name": "Salary", "type": "decimal", "isOptional": true },
        { "name": "Age", "type": "int", "isOptional": false, "min": 18, "max": 70 },
        { "name": "Birthday", "type": "datetime", "isOptional": false }
      ]
    },
    {
      "name": "Citizen",
      "namespace": "RI.Novus.Core.Users",
      "properties": [
        { "name": "Id", "type": "guid", "isOptional": false },
        { "name": "Names", "type": "string", "isOptional": false },
        { "name": "Salary", "type": "decimal", "isOptional": true,  "min": 0.01, "max": 100.5  },
        { "name": "Age", "type": "int", "isOptional": false },
        { "name": "Birthday", "type": "datetime", "isOptional": false }
      ]
    }
  ]
}

```
.... 

The supported property types for the moment are:
1. **guid**
2. **string**
3. **decimal**
4. **int**
5. **datetime**

```
npm run generation
```

## Set template generation in watch Mode(For every change in the code, file template are regenerated.)

⚠️ ***This option is recommend only for development*** 

```
npm run generation-watch
```

# Contribute

```
.
├── README.md
├───coverage
│   └───lcov-report
│       ├───customWriters
│       └───helpers
├───GenerateEntityRequest
├───result
│   └───NotarialReceipt
└───src
    ├───customWriters
    ├───domainPrimitiveGenerators
    ├───helpers
    ├───models
    └───tests
        ├───customWriters
        └───helpers
```

* `coverage` : Contain code coverage html reports.
* `GenerateEntityRequest`: Contain a json modifiable to generate domain primitive entity with its properties.
* `result`: Will contain the generation result.
* `src`: All sources go here.
* `domainPrimitiveGenerators`, contain different domain primitive types generators.
* `helpers`: Helpers to validate Create template request.
* `tests`: Where project tests are located.
