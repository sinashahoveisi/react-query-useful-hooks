# react-query-useful-hooks

The best and useful hooks for [react-query]


![GitHub branch checks state](https://img.shields.io/github/checks-status/sinashahoveisi/react-query-useful-hooks/master?logo=github&style=plastic)
![GitHub issues](https://img.shields.io/github/issues/sinashahoveisi/react-query-useful-hooks?logo=github&style=plastic)
![GitHub](https://img.shields.io/github/license/sinashahoveisi/react-query-useful-hooks?style=plastic)
![npm](https://img.shields.io/npm/v/react-query-useful-hooks?logo=npm&style=plastic)
![Website](https://img.shields.io/website?down_message=offline&style=plastic&up_message=online&url=https%3A%2F%2Fsinasho.ir)
![GitHub language count](https://img.shields.io/github/languages/count/sinashahoveisi/react-query-useful-hooks?logo=TypeScript&style=plastic)
![GitHub top language](https://img.shields.io/github/languages/top/sinashahoveisi/react-query-useful-hooks?logo=TypeScript&style=plastic)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/sinashahoveisi/react-query-useful-hooks?style=plastic)

## Features

- All the [axios] awesomeness you are familiar with
- Zero configuration, but configurable if needed
- One-line usage

## Installation

```sh
npm install axios react-query react-query-useful-hooks
```
> `axios` and `react-query` is a peer dependency and needs to be installed explicitly

## Api

```tsx
import {useFetch, useInfinite, usePaginate, usePost, configure} from 'react-query-useful-hooks';
```

## Quick Start

```tsx
import React from 'react';
import {useFetch} from 'react-query-useful-hooks';

import React from 'react';
import {useFetch} from 'react-query-useful-hooks';

function Todos() {
    const {isError, isFetching, data, refetch} = useFetch({
        url: 'todos/1',
        enabled: true
    });

    if (isFetching) return <p>Loading...</p>;
    if (isError) return <p>Error!</p>;
    return (
        <div>
            <button onClick={() => refetch()}>refetch</button>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default Todos;
```

## API

The package exports one default export and named exports:

```tsx
import {
    useFetch, 
    useInfinite, 
    usePaginate, 
    usePost, 
    configure
} from 'react-query-useful-hooks';
```

## Creator

Sina Shah Oveisi [@sinashahoveisi](https://sinasho.ir)

> I love programming and I am interested in popular frameworks or programming languages and I am currently coding with JavaScript and React framework.

---

## License
[MIT][license] © [Sina Shahoveisi][author]

[react]: http://reactjs.org

[react-query]: https://react-query-v3.tanstack.com/

[npm]: https://docs.npmjs.com/cli/install

[yarn]: https://docs.yarn.com/cli/install

[author]: https://github.com/sinashahoveisi

[license]: https://github.com/sinashahoveisi/react-query-useful-hooks/blob/master/LICENSE