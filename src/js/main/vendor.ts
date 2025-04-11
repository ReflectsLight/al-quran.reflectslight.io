import { render, createContext, createRef } from "preact"
import { useState, useEffect, useMemo, useContext, useRef } from "preact/hooks"
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
  createContext,
  useContext,
  classNames,
}
Object.assign(window, exports)
