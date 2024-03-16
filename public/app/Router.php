<?php namespace App;

class Router {
  public static array $list = [];

  public static function enable(bool $debug = false): string {
    if ($debug) {
      echo "<pre>";
      var_dump(self::$list);
      echo "</pre>";
    }

    $query = $_GET['q'];

    $page = '404';
    foreach (self::$list as $route) {
      if ($route["uri"] == "$query") {
        $page = $query;
      }
    }
    return $page;
  }

  public static function register(string $uri, string $pageName): void {
    self::$list[] = [
      "uri" => $uri,
      "page" => $pageName,
    ];
  }
}
