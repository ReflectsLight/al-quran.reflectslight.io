import { render } from "preact";
import { useState, useEffect, useMemo, useRef } from "preact/hooks";
import * as React from "preact/compat";
import classNames from "classnames";

const exports = {
  React,
  render,
  useState,
  useEffect,
  useMemo,
  useRef,
  classNames,
};
Object.assign(window, exports);
