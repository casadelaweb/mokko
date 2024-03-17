<?php namespace App;

class Router {
  protected static array $list = [];
  protected static string $query;

  public static function init(bool $debug = false): string {
    if ($debug) {
      echo "<pre>";
      var_dump(self::$list);
      echo "</pre>";
    }

    self::$query = $_GET['q'] ?? '/';
    //self::$query = $_SERVER['REQUEST_URI'] ?? '/';

    $page = '404';
    foreach (self::$list as $route) {
      $uri = $route["uri"];
      $q = self::$query;
      if ($uri === $q || $uri === "/$q" || $uri === "$q/" || $uri === "/$q/") {
        $page = $route["page"];
      }
    }
    return $page;
  }

  public static function current(): string {
    return self::$query;
  }

  public static function register(string $uri, string $pageName): void {
    self::$list[] = [
      "uri" => $uri,
      "page" => $pageName,
    ];
  }
}
