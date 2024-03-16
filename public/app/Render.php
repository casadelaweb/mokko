<?php namespace App;

class Render {
  public static function component(string $name): void {
    require_once "app/views/components/$name.php";
  }

  public static function page(string $name): void {
    require_once "app/views/pages/$name.php";
  }
}
