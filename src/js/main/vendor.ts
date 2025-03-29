import { render, createRef } from "preact"
import { useState, useEffect, useMemo, useRef } from "preact/hooks"
import * as React from "preact/compat"
import classNames from "classnames"

const exports = {
  React,
  render,
  useState,
  useEffect,
  useMemo,
  useRef,
  createRef,
  classNames,
}
Object.assign(window, exports)
