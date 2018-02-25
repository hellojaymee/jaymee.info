<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return array(

  // local
  'localhost' => array(
    'devMode' => true,
    'siteUrl' => 'http://localhost:8888/',
    'environmentVariables' => array(
      'basePath' => $_SERVER['DOCUMENT_ROOT'] . '/',
      'baseUrl'  => 'http://localhost:8888/',
    ),
    'testToEmailAddress' => 'dev@email.com',
  ),

  // jaymee.info
  '104.236.81.87' => array(
    'omitScriptNameInUrls' => true,
    'siteUrl' => 'http://104.236.81.87',
    'environmentVariables' => array(
      'basePath' => '/var/www/html/',
      'baseUrl'  => 'http://104.236.81.87',
    )
  )

);