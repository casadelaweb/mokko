<?php namespace App;

function getFilePathWithHash(string $path): string {
  $timestamp = filemtime($_SERVER['DOCUMENT_ROOT'] . $path);
  return $path . '?v=' . $timestamp;
}

function searchByUrl($url, $array): int|string|null {
  foreach ($array as $key => $value) {
    if ($value['url'] === $url) {
      return $key;
    }
  }
  return null;
}
