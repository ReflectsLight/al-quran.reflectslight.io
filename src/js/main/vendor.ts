import classNames from "classnames"
import { createContext, createRef, render } from "preact"
import * as React from "preact/compat"
import { useContext, useEffect, useMemo, useRef, useState } from "preact/hooks"

const exports = {
  React,
  render,
  useState,
  useEffect,
  useMemo,
  useRef,
  createRef,
  createContext,
  useContext,
  classNames,
}
Object.assign(window, exports)
