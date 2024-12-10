# Interview Assessment (PHP)

This is a simple assessment to gauge your knowledge of PHP and the core language
features of the language. In this assessment, you will be making a simple
_Dependency Injection_ library that is framework-agnostic and can be used in any
PHP project. The goal of this assessment is to test your knowledge of various
design patterns and your understanding of the core fundamentals of PHP.

## Problem Statement

You are tasked with creating a simple _Dependency Injection_ library that can be
used in any PHP project. The library should allow developers to register
dependencies and resolve them when needed. The library should support dependency
injection through constructor injection.

## Requirements

| Points | Requirement                                                                                    |
|--------|------------------------------------------------------------------------------------------------|
| 10     | The library should utilize Composer's autoload system.                                         |
| 10     | The library should have a `Container` class that contains registered services.                 |
| 5      | The `Container` class should have a `register` method to register services.                    |
| 10     | The `Container` class should have a `compile` method to compile services.                      |
| 10     | The `Container` class should have a `get` method to retrieve services.                         |
| 10     | The `Container`'s `get` method should throw an error if a requested service is not registered. |
| 10     | The library should support constructor injection.                                              |
| 15     | The library should support asynchronous service creation through factories.                    |
| 10     | The library should throw an error if a circular reference is detected when compiling services. |
| 5      | The library should support transient services.                                                 |
| 15     | Services should be registrable with a `@Service` decorator.                                    |
| 25     | The library should be tested with unit tests.                                                  |

> [!TIP]
> Feel free to move internal logic into separate classes to adhere to the
> Single Responsibility Principle.

### Usage example

```php
<?php
declare(strict_types=1);

#[Service]
class Logger
{
    public function log(string $message): void
    {
        echo $message . PHP_EOL;
    }
}
```

```php
<?php
declare(strict_types=1);

#[Service]
class ServiceA
{
    private Logger $logger;

    public function __construct(Logger $logger)
    {
        $this->logger = $logger;
        $this->logger->log('ServiceA created');
    }

    public function doSomething(): void
    {
        $this->logger->log('ServiceA doing something');
    }
}
```

```php
<?php
declare(strict_types=1);

#[Service]
class ServiceB
{
    private Logger $logger;

    public function __construct(Logger $logger)
    {
        $this->logger = $logger;
        $this->logger->log('ServiceB created');
    }

    public function doSomething(): void
    {
        $this->logger->log('ServiceB doing something');
    }
}
```

```php
<?php
declare(strict_types=1);

// You can either use Composer's autoload functionality to automatically
// discover and classes annotated with the #[Service] attribute or manually
// register services with the Container class.
$container = new Container();
$container->register(Logger::class);
$container->register(ServiceA::class);
$container->register(ServiceB::class);
$container->compile();

$container->get(ServiceB::class)->doSomething();
```

## Evaluation Criteria

When reviewing your submission, we will be looking for the following:

1. Clean, readable, and maintainable code with a consistent coding style.
2. Proper use of language features and best practices.
3. Proper use of SOLID principles and design patterns with emphasis on separation
   of concerns.
4. Unit tests that cover the core functionality of your implementation.
5. Functional tests that demonstrate the usage of your library written as a small
   example application from the perspective of a developer using your library.
6. The ability to follow the requirements and deliver a working solution.
