<?php namespace App;

class Render {
  public static function component(string $name, bool $once = true): void {
    if ($once) {
      include_once "views/components/$name.php";
    } else {
      include "views/components/$name.php";
    }
  }

  public static function page(string $name): void {
    include_once "views/pages/$name.php";
  }
}
