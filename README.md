# Introduction 
Mono repo for "Domain Primitive Generation" software project. For ```Wepsys.Core 3.1.1```

# Getting Started

1. Clone this repo
2. Run command ```npm install```

# Build and Test

## Run ALL tests and see test coverage
```
npm run test 
```

## Run ALL tests in watch mode and see test coverage
```
npm run test-watch
```

## Run template generation

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
