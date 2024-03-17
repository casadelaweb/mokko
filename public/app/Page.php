<?php namespace App;

class Page {
  public string $title;
  public string $metaDescription;
  public string $metaKeywords;
  public string|null $url;
  public string $view;
  public Page|null $parent;

  public function __construct(array $props) {
    $this->title = $props['title'];
    $this->metaDescription = $props['metaDescription'];
    $this->metaKeywords = $props['metaKeywords'];
    $this->url = $props['url'];
    $this->view = $props['view'];
    $this->parent = $props['parent'];
  }
}
