# Range Component For PT MANGO
## Contents

- [Description](#description)
- [Requirements of the project](#requirements-of-the-project)
- [How to install and use](#how-to-install-and-use)
- [Mocked server](#mocked-server)

## Description

This repository contains a test project which consists in creating a range slider without using the HTML5 input range control.

## Requirements of the project

The `<Range />` component has to be able to accept either `min` and `max` values, between which the user will be able to choose whatever value, or a `rangeValues` prop, which will force the user to choose one of the specified values in the array.

## How to install and use

Just clone this git repository, and run in the terminal, targetting your cloned folder:

```
> yarn install
> yarn start
```

Then, you can access the application in `http://localhost:8080/`.