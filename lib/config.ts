import ms from "ms";
import { createAnthropic } from "@ai-sdk/anthropic";

/**
 * Centralized configuration for the Code Analysis Agent.
 */

// Model name (without provider prefix)
const MODEL_NAME = "claude-sonnet-4-20250514";

// Model ID string with provider prefix (serializable - for workflows)
export const MODEL_ID = `anthropic/${MODEL_NAME}`;

// Anthropic model instance (for stateless API routes like bash-tool)
export function getModel() {
  const anthropic = createAnthropic();
  return anthropic(MODEL_NAME);
}

// Sandbox configuration - shared across all modes
export const SANDBOX_CONFIG = {
  timeout: ms("20m"),
  vcpus: 2,
  runtime: "node22",
  workspacePath: "/vercel/sandbox/workspace",
};

// Agent configuration
export const AGENT_CONFIG = {
  maxSteps: 50,
};

// Workflow configuration
export const WORKFLOW_CONFIG = {
  maxConversationTurns: 100,
  /** Timeout in ms for waiting on user message (5 minutes) */
  hookTimeoutMs: ms("5m"),
};

// UI configuration
export const UI_CONFIG = {
  /** Pixels from bottom to trigger auto-scroll during streaming */
  autoScrollThreshold: 100,
  /** Maximum characters to show in command preview before truncating */
  commandPreviewLength: 80,
};

// Session storage keys
export const STORAGE_KEYS = {
  conversationId: "conversation-id",
  workflowRunId: "workflow-run-id",
  agentMode: "agent-mode",
  sandboxId: "sandbox-id",
};

// Step names for logging
export const STEP_NAMES = {
  bash: "bash",
  gitClone: "git-clone",
  readFile: "read-file",
  listDirectory: "list-directory",
  searchFiles: "search-files",
};

/**
 * Tool names as exposed to the AI model.
 *
 * Mapping:
 * - git_clone    → cloneRepository()
 * - list_files   → listDirectory()
 * - read_file    → readFile()
 * - search_files → searchFiles()
 * - bash         → runBash()
 */
export const TOOL_NAMES = {
  gitClone: "git_clone",
  listFiles: "list_files",
  readFile: "read_file",
  searchFiles: "search_files",
  bash: "bash",
};

/**
 * Consistent logging utility - logs follow the pattern: [Context] message
 */
export const log = {
  api: (message: string, ...args: unknown[]) =>
    console.log(`[API] ${message}`, ...args),

  workflow: (message: string, ...args: unknown[]) =>
    console.log(`[Workflow] ${message}`, ...args),

  step: (name: string, message: string, ...args: unknown[]) =>
    console.log(`[Step:${name}] ${message}`, ...args),

  sandbox: (message: string, ...args: unknown[]) =>
    console.log(`[Sandbox] ${message}`, ...args),

  error: (context: string, message: string, ...args: unknown[]) =>
    console.error(`[${context}] ERROR: ${message}`, ...args),
};
