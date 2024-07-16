<?php

declare(strict_types=1);

namespace App\Logging;

use Illuminate\Log\Logger;
use Monolog\Formatter\LineFormatter;
use Illuminate\Http\Request;

class LogFormatter
{
    private string $logFormat;
    private string $remoteAddr;

    public function setLogFormat(array $columns): void
    {
        $logFormat = implode("", $columns) . PHP_EOL;
        $this->logFormat = $logFormat;
    }

    public function getLogFormat(): string
    {
        return $this->logFormat;
    }

    public function setRemoteAddr(?Request $request = null): void
    {
        if ($request && $request->hasHeader('X-Forwarded-For')) {
            $this->remoteAddr = $request->header('X-Forwarded-For');
        } else {
            $this->remoteAddr = $request ? $request->ip() : "unknown";
        }
    }

    public function getRemoteAddr(): string
    {
        return $this->remoteAddr;
    }

    public function __invoke(Logger $logger): void
    {
        $this->setRemoteAddr(app(Request::class));

        $aryCols = [
            "[%datetime%]",
            "[". $this->getRemoteAddr() ."]",
            " %channel%.%level_name%:",
            "%message%",
            " %context%",
            " %extra%"
        ];

        $this->setLogFormat($aryCols);

        foreach ($logger->getHandlers() as $handler) {
            $handler->setFormatter(new LineFormatter(
                $this->getLogFormat(),
                null,
                true,
                true
            ));
        }
    }
}
