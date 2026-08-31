---
title: "🛠️ Development"
description: "How to extend WAHA - apps, modules, session plugins - and how to clone, build and run it locally"
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2026-08-31T12:00:00+00:00
draft: false
weight: 800
images: ["cover.png"]
slug: development
---

This page is for developers who want to **change WAHA itself** - add new functionality on top of it,
fix a bug in an engine, add an API endpoint, tweak the dashboard or the docs.

If you just want to **use** WAHA - go to [**🔧 Install & Update**]({{< relref "/docs/how-to/install" >}}) instead.

## Overview

WAHA is not a single repository. It's a NestJS application that drives four WhatsApp engines,
and each engine is a separate library maintained (or forked) in its own repository.

```text
waha                       - REST API, webhooks, sessions, storages, dashboard hosting
├── WEBJS  -> whatsapp-web.js         (Node.js, Puppeteer)
├── NOWEB  -> Baileys                 (Node.js, WebSocket)
├── GOWS   -> gows + whatsmeow        (Go, WebSocket, talks to WAHA over gRPC)
└── WPP    -> wppconnect + wa-js      (Node.js, Puppeteer)
```

### How to start

Clone everything into a single `devlikeapro` folder, keeping the folder names exactly as below - scripts depend on them.

```bash
mkdir -p ~/devlikeapro && cd ~/devlikeapro

# WAHA, dashboard, docs
git clone https://github.com/devlikeapro/waha.git
git clone https://github.com/devlikeapro/waha-hub.git
git clone https://github.com/devlikeapro/waha-docs.git

# Engines
git clone https://github.com/devlikeapro/whatsapp-web.js.git webjs
git clone https://github.com/devlikeapro/Baileys.git noweb
git clone https://github.com/devlikeapro/gows-plus.git gows
git clone https://github.com/devlikeapro/whatsmeow.git
git clone https://github.com/wppconnect-team/wppconnect.git wpp
git clone https://github.com/wppconnect-team/wa-js.git
```

{{< callout context="caution" title="Folder names matter" icon="outline/alert-triangle" >}}
The folder names are not cosmetic - the build scripts reach across repositories by relative path,
for example WAHA's `Makefile` builds **GOWS** from `../gows`.
{{< /callout >}}

Install dependencies:

```bash
cd ~/devlikeapro/waha
yarn install
```

Set the environment and start it:

```bash
export DEBUG=1
export WAHA_DEBUG_MODE=True
export WAHA_API_KEY=666
export WAHA_DASHBOARD_USERNAME=admin
export WAHA_DASHBOARD_PASSWORD=666
export WHATSAPP_SWAGGER_USERNAME=admin
export WHATSAPP_SWAGGER_PASSWORD=666
export WHATSAPP_DEFAULT_ENGINE=NOWEB   # WEBJS | NOWEB | WPP | GOWS
export WAHA_HTTP_STRICT_MODE=1
export WAHA_MEDIA_STORAGE=LOCAL
export WHATSAPP_FILES_FOLDER=./.media

yarn start
```

Then open:

- Dashboard - <http://localhost:3000/dashboard>
- Swagger - <http://localhost:3000/>

To build the Docker images instead:

```bash
make build          # devlikeapro/waha
make build-chrome   # image with Chrome instead of Chromium
make build-noweb    # browserless image, NOWEB default
make build-gows     # browserless image, GOWS default
```

### Repositories

Almost every build script uses **relative paths** between these repositories
(`../gows`, `../whatsmeow`, `../waha`), so all of them must be cloned side by side.

| Project | Repository | Folder | Note |
|---|---|---|---|
| **WAHA** | [devlikeapro/waha](https://github.com/devlikeapro/waha) | `waha` | The WAHA application - NestJS. REST API, WebSockets, webhooks, session management, security, storages, engine orchestration. |
| **Dashboard** | [devlikeapro/waha-hub](https://github.com/devlikeapro/waha-hub) | `waha-hub` | Dashboard UI (`waha-hub/ui`, Nuxt) that talks to the WAHA API. Built output is shipped inside the WAHA image. |
| **Dashboard** | [devlikeapro/dashboard](https://github.com/devlikeapro/dashboard) | - | Build artifact of the dashboard. WAHA's `Dockerfile` downloads it by the pinned SHA from `waha.config.json`. You don't clone this one. |
| **Docs** | [devlikeapro/waha-docs](https://github.com/devlikeapro/waha-docs) | `waha-docs` | This documentation site - Hugo. |
| **WEBJS** | [devlikeapro/whatsapp-web.js](https://github.com/devlikeapro/whatsapp-web.js) | `webjs` | Automates WhatsApp Web in a real browser via Puppeteer. Our fork of [pedroslopez/whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js). |
| **NOWEB** | [devlikeapro/Baileys](https://github.com/devlikeapro/Baileys) | `noweb` | Speaks the WhatsApp Web protocol directly over a WebSocket, no browser. Our fork of [WhiskeySockets/Baileys](https://github.com/WhiskeySockets/Baileys). |
| **GOWS** | [devlikeapro/gows-plus](https://github.com/devlikeapro/gows-plus) | `gows` | Go service that wraps `whatsmeow` and exposes it to WAHA over gRPC on a unix socket. Compiled binary is shipped inside the WAHA image. Ours. |
| **GOWS** | [devlikeapro/whatsmeow](https://github.com/devlikeapro/whatsmeow) | `whatsmeow` | The Go WhatsApp Web library **GOWS** is built on. Wired in via a `replace` directive in `gows/src/go.mod`. Our fork of [tulir/whatsmeow](https://github.com/tulir/whatsmeow). |
| **WPP** | [wppconnect-team/wppconnect](https://github.com/wppconnect-team/wppconnect) | `wpp` | Puppeteer-based engine. Not forked - used straight from upstream. |
| **WPP** | [wppconnect-team/wa-js](https://github.com/wppconnect-team/wa-js) | `wa-js` | The library **WPP** injects into the WhatsApp Web page. Not forked - used straight from upstream. |

WAHA consumes the Node.js engines straight from GitHub - there is no npm release step for the forks.
From `waha/package.json`:

```jsonc { title="package.json" }
{
  "@adiwajshing/baileys": "github:devlikeapro/Baileys#fork-master-2026-04-28",
  "whatsapp-web.js": "github:devlikeapro/whatsapp-web.js#fork-main-2026-06-26",
  "@wppconnect-team/wppconnect": "github:wppconnect-team/wppconnect#master",
  "@wppconnect/wa-js": "github:wppconnect-team/wa-js#main"
}
```

The **GOWS** binary and the dashboard are pinned by version/SHA instead:

```jsonc { title="waha.config.json" }
{
  "waha": {
    "gows": { "repo": "devlikeapro/gows-plus", "ref": "v1.0.43" },
    "dashboard": { "repo": "devlikeapro/dashboard", "ref": "5908178..." }
  }
}
```

### Branches

Our forks never commit to `main`/`master`. We rebase onto upstream and keep a dated fork branch,
which is exactly the branch referenced in `package.json`:

| Engine | Upstream branch | Our fork branch |
|---|---|---|
| **WEBJS** | `main` | `fork-main-<YYYY-MM-DD>` |
| **NOWEB** | `master` | `fork-master-<YYYY-MM-DD>` |
| **GOWS** | `main` | `fork-main-<YYYY-MM-DD>` (`whatsmeow`) |

When we pull upstream changes, we create a **new** dated branch and bump the reference in `package.json`
(or in `gows/src/go.mod` for `whatsmeow`).

In the forks, add the upstream as a second remote and check out the branch WAHA actually uses:

```bash
cd ~/devlikeapro/noweb
git remote add upstream https://github.com/WhiskeySockets/Baileys.git
git checkout fork-master-2026-04-28   # see package.json for the current branch
```

## Extending WAHA

WAHA has four extension layers, ordered from the **most preferred** to the **last resort**.
When you build something for WAHA, pick the **highest layer that fits** - it keeps your change contained,
easy to review and safe from breaking unrelated functionality.

| You're building | Use | Examples |
|---|---|---|
| New functionality **on top of** WAHA - an integration, a region-specific behavior, a per-session feature | [🧩 App](#-apps) | [**Chatwoot**]({{< relref "/docs/apps/chatwoot" >}}), [**Brazilian Phone Numbers**]({{< relref "/docs/apps/brazilian-phone-numbers" >}}) |
| A **product-wide** capability, enabled and configured globally via environment variables | [📦 Module](#-modules) | Prometheus metrics, Webhooks |
| A **low-level tweak** of how requests and events flow through a session | [🔌 Session Plugin](#-session-plugins) | wid normalization, auto-online presence |
| A new **core WhatsApp feature** or an engine bug fix | [🏭 Engines & Core](#-engines-and-core) | new API endpoint, engine behavior fix |

{{< callout context="caution" title="Internal contracts" icon="outline/alert-triangle" >}}
Everything below describes **internal** interfaces - they may change between releases without notice.
The links point to files on the [core branch](https://github.com/devlikeapro/waha/tree/core) -
always check the **latest** version of a file before building on it.
{{< /callout >}}

{{< callout context="tip" title="PRs are welcome!" icon="outline/rocket" >}}
We're happy to review your [pull requests](https://github.com/devlikeapro/waha/pulls)!
A PR that keeps its changes inside an app, a module or a plugin - with **minimal touches to the core code
and engines** - gets reviewed fast and is likely to be accepted.
{{< /callout >}}

To show what each layer looks like, we'll build the same fake, deliberately tiny feature three times -
a **Message Logger** that logs every incoming message. The logging itself is a session plugin:

```typescript { title="MessageLoggerPlugin.ts" }
import { SessionPlugin } from '@waha/core/abc/session.plugin';
import { PluginEvent } from '@waha/core/abc/session.plugin.events';
import { WAHAEvents } from '@waha/structures/enums.dto';
import { WAMessage } from '@waha/structures/responses.dto';
import { Observable } from 'rxjs';

export class MessageLoggerPluginConfig {
  prefix: string;
}

export class MessageLoggerPlugin extends SessionPlugin<MessageLoggerPluginConfig> {
  @PluginEvent(WAHAEvents.MESSAGE)
  onMessage(messages$: Observable<WAMessage>) {
    messages$.subscribe((message: WAMessage) => {
      this.logger.info(`${this.config.prefix} message '${message.id}' in '${this.session.name}'`);
    });
  }
}
```

What differs per layer is **who registers it and where the configuration comes from**:
an **app** attaches it to a session with per-session config, a **module** attaches it to every session
with global env config, and the plugin itself is the low-level building block both of them share.

### 🧩 Apps

An **app** is a per-session unit of functionality - the way to add **new functionality that extends WAHA**:
an integration with an external product (Chatwoot) or a region-specific behavior (Brazilian Phone Numbers).
Read [**Apps**]({{< relref "/docs/apps/about" >}}) first to see how apps look from the user's point of view.

An app instance is a row in the `apps` table with its own validated `config`, attached to one session.
Users manage apps via the [Apps API]({{< relref "/docs/apps/about#api" >}}) (`POST /api/apps`),
via `apps[]` in the session create/update payload, or right in the Dashboard.

An app can have:

- **Its own API** - NestJS controllers, tagged in Swagger automatically.
- **Per-session config** - a DTO validated per app type, editable in the Dashboard.
- **Its own database schema** - tables and Knex migrations, run automatically.
- **Session plugins** - hook into the session's events and request flow.
- **Lifecycle hooks** - react to create/update/delete/purge and session start.

The code lives in [src/apps](https://github.com/devlikeapro/waha/tree/core/src/apps) - `app_sdk/` is the framework,
each app is a folder next to it:

```text
src/apps/message-logger/
├── app.module.ts                        - the app manifest (see below)
├── dto/config.dto.ts                    - per-session config DTO
├── services/MessageLoggerAppService.ts  - lifecycle hooks, contributes plugins
├── plugins/MessageLoggerPlugin.ts       - session plugin(s)
├── api/                                 - optional: own controllers
├── storage/                             - optional: repositories over own tables
└── migrations/                          - optional: Knex migrations
```

Registering an app takes three touch points:

1. Add the app name to the `AppName` enum and its config DTO to `AppConfigClasses` in
   [app_sdk/apps/apps.ts](https://github.com/devlikeapro/waha/blob/core/src/apps/app_sdk/apps/apps.ts).
2. Add the app module to the `APPS` array in
   [app_sdk/apps/registry.ts](https://github.com/devlikeapro/waha/blob/core/src/apps/app_sdk/apps/registry.ts).
3. Create `app.module.ts` - the manifest implementing the `AppModule` interface from
   [app_sdk/apps/definition.ts](https://github.com/devlikeapro/waha/blob/core/src/apps/app_sdk/apps/definition.ts):

```typescript { title="src/apps/message-logger/app.module.ts" }
const MessageLoggerAppModule: AppModule = {
  name: AppName.messageLogger,
  openapi: {
    title: 'Message Logger',
    description: 'Log every incoming message',
  },
  definition: {
    plainkey: false,        // app calls WAHA's own API and needs WAHA_API_KEY_PLAIN
    queue: false,           // app needs BullMQ queues (requires Redis)
    migrations: false,      // app has database migrations
    restartOnChange: true,  // adding/updating/removing the app restarts the session
    unique: true,           // only one instance of the app per session
  },
  nestjs: {
    imports: [],
    controllers: [],
    providers: [MessageLoggerAppService],
  },
  Service: MessageLoggerAppService,
};

export default MessageLoggerAppModule;
```

The app service implements `IAppService` from
[app_sdk/services/IAppService.ts](https://github.com/devlikeapro/waha/blob/core/src/apps/app_sdk/services/IAppService.ts) -
validation, `beforeCreated`/`beforeUpdated`/`beforeDeleted`, `purge` (wipe the app's data),
`beforeSessionStart`/`afterSessionStart`, and the key one - `plugins()`, which contributes session plugins:

```typescript { title="src/apps/message-logger/services/MessageLoggerAppService.ts" }
@Injectable()
export class MessageLoggerAppService implements IAppService {
  // ...most hooks are no-ops for this app

  plugins(app: App<MessageLoggerAppConfig>, session: WhatsappSession, store?: DataStore): PluginOptions[] {
    return [MessageLoggerPlugin.with({ prefix: app.config.prefix }, null)];
  }
}
```

With that in place, the app works end to end:

```http request
POST /api/apps
```

```jsonc { title="Body" }
{
  "session": "default",
  "app": "message-logger",
  "config": {
    "prefix": "👀"
  }
}
```

A few more things an app can do:

- **Own API** - add controllers to `nestjs.controllers`, e.g. `@Controller('api/apps/message-logger/:session')`.
  For `unique` apps, resolve the app row and its live plugin with `UniqueAppResolver`
  ([app_sdk/services/UniqueAppResolver.ts](https://github.com/devlikeapro/waha/blob/core/src/apps/app_sdk/services/UniqueAppResolver.ts)).
  Don't add `@ApiTags` - the registry tags the controllers automatically.
- **Own database schema** - put Knex migrations in `migrations/` and set `definition.migrations: true`;
  WAHA runs them automatically and tracks them in a per-app `app_<name>_migrations` table.
  Convention: name tables `app_<name>_...` with an `app_pk` foreign key to `apps.pk` (ON DELETE CASCADE) - see
  [the Brazilian Phone Numbers migration](https://github.com/devlikeapro/waha/blob/core/src/apps/brazilian-phone-numbers/migrations/001_init_brazilian_phone_numbers.ts).
- **Queues** - set `definition.queue: true` to get BullMQ (requires Redis); extend `AppConsumer` for workers.
  Chatwoot is the reference here.

Apps are controlled at runtime by `WAHA_APPS_ENABLED=true`, plus `WAHA_APPS_ON`/`WAHA_APPS_OFF`
comma-lists to enable or disable specific apps.

**Dashboard** - a new app should also get a config form in the Dashboard, which lives in
[devlikeapro/waha-hub](https://github.com/devlikeapro/waha-hub) (`ui/`, Nuxt + PrimeVue).
The generic `/api/apps` client already handles any app, so it's UI work only:

- [ui/components/apps/AppEdit.vue](https://github.com/devlikeapro/waha-hub/blob/main/ui/components/apps/AppEdit.vue) -
  add the app to the type dropdown and dispatch to your config form.
- `ui/components/apps/AppConfigMessageLogger.vue` - the config form (`v-model="app.config"`).
- `ui/components/apps/AppFAQMessageLogger.vue` - the "About this app" accordion with a docs link.
- `ui/components/common/MessageLoggerLabel.vue` - emoji + name label.
- `ui/services/waha/dtos.ts` - the config interface.
- `ui/i18n/locales/*.json` - translation keys (run `node scripts/check-i18n.js`).

Existing apps, from simplest to richest - use them as templates:

- [calls](https://github.com/devlikeapro/waha/tree/core/src/apps/calls) - one plugin, no API, no database.
- [brazilian-phone-numbers](https://github.com/devlikeapro/waha/tree/core/src/apps/brazilian-phone-numbers) -
  engine-specific plugins, own API, own table + migration.
- [mcp](https://github.com/devlikeapro/waha/tree/core/src/apps/mcp) - own HTTP surface outside `/api`.
- [chatwoot](https://github.com/devlikeapro/waha/tree/core/src/apps/chatwoot) - queues, consumers, webhook
  controller, several tables.

### 📦 Modules

A **module** extends WAHA **as a product** - a capability that applies to the whole server, not to one session:
Prometheus metrics, webhook delivery, presence automation. A module is a plain NestJS module in
[src/modules](https://github.com/devlikeapro/waha/tree/core/src/modules) (folder convention: `waha-<name>/`),
listed in `IMPORTS_CORE` in
[app.module.core.ts](https://github.com/devlikeapro/waha/blob/core/src/core/app.module.core.ts).

The rules for modules:

- **Configured by environment variables only** - `WAHA_<NAME>_*`, with an `..._ENABLED` variable when the module
  is optional. No per-session config - if you need that, you're probably building an [app](#-apps).
  (Webhooks are the historical exception - the `WebhookPlugin` merges per-session `config.webhooks` with the global
  env config.)
- **No database access** - modules keep state in memory.
- A module **can add API endpoints** and **can inject session plugins** into every session.

A module folder typically holds `<name>.module.ts`, `<name>.config.ts` (env parsing + validation),
`<name>.plugins.ts` (the plugin provider) and the plugin classes. The Message Logger as a module:

```typescript { title="src/modules/waha-message-logger/message-logger.config.ts" }
enum Env {
  WAHA_MESSAGE_LOGGER_ENABLED = 'WAHA_MESSAGE_LOGGER_ENABLED',
  WAHA_MESSAGE_LOGGER_PREFIX = 'WAHA_MESSAGE_LOGGER_PREFIX',
}

export function isMessageLoggerEnabled(env: NodeJS.ProcessEnv): boolean {
  return parseBool(env[Env.WAHA_MESSAGE_LOGGER_ENABLED]);
}

@Injectable()
export class MessageLoggerConfigService {
  get prefix(): string {
    return process.env[Env.WAHA_MESSAGE_LOGGER_PREFIX] || '👀';
  }
}
```

The module injects the plugin into every session through `SessionPluginsService`
([src/plugins/SessionPluginsService.ts](https://github.com/devlikeapro/waha/blob/core/src/plugins/SessionPluginsService.ts)) -
the session manager collects plugins from all registered providers without knowing about your module:

```typescript { title="src/modules/waha-message-logger/message-logger.plugins.ts" }
@Injectable()
export class MessageLoggerPluginsProvider implements SessionPluginsProvider {
  constructor(private config: MessageLoggerConfigService) {}

  plugins(session: WhatsappSession): PluginOptions[] {
    return [MessageLoggerPlugin.with({ prefix: this.config.prefix }, null)];
  }
}
```

```typescript { title="src/modules/waha-message-logger/message-logger.module.ts" }
@Module({
  imports: [SessionPluginsModule],
  providers: [MessageLoggerConfigService, MessageLoggerPluginsProvider],
})
export class MessageLoggerModule {
  constructor(sessionPlugins: SessionPluginsService, provider: MessageLoggerPluginsProvider) {
    sessionPlugins.register(provider);
  }
}
```

Finally, wire it into `IMPORTS_CORE` in `app.module.core.ts` - optional modules are only loaded
when their env variable says so:

```typescript { title="src/core/app.module.core.ts" }
ConditionalModule.registerWhen(MessageLoggerModule, isMessageLoggerEnabled),
```

A module can also register controllers, and when it serves paths outside `/api` it should declare them via
`HttpPathsService` ([src/plugins/HttpPathsService.ts](https://github.com/devlikeapro/waha/blob/core/src/plugins/HttpPathsService.ts))
so the global basic auth, api-key middleware, access log and HTTP metrics treat them correctly.

Existing modules to learn from:

- [waha-wid-suffix](https://github.com/devlikeapro/waha/tree/core/src/modules/waha-wid-suffix) - the smallest one:
  a module + provider + one-method plugin.
- [waha-prometheus](https://github.com/devlikeapro/waha/tree/core/src/modules/waha-prometheus) - the full pattern:
  Joi-validated `WAHA_PROMETHEUS_*` env config, a controller on a configurable path, middleware,
  optional basic auth, conditional loading.
- [waha-webhook](https://github.com/devlikeapro/waha/tree/core/src/modules/waha-webhook) - global env config
  merged with per-session config inside the plugin.

### 🔌 Session Plugins

A **session plugin** is the lowest-level extension point - a class attached to a session that taps into
its lifecycle hooks and event streams. Use it for cross-cutting tweaks of how requests and events flow
through a session: normalize chat ids, collect info, react to events.

Plugins don't exist on their own - they are contributed either by a [module](#-modules) (for every session,
global config) or by an [app](#-apps) (per session, per-session config). The rules:

- **No database access** - keep state in memory. The exception: an app that owns the plugin may pass
  a repository over its own tables through `deps` (Brazilian Phone Numbers does exactly that).
- A plugin gets `session`, a child `logger`, its `config` and optional `deps` - nothing else.

The contract is in
[src/core/abc/session.plugin.ts](https://github.com/devlikeapro/waha/blob/core/src/core/abc/session.plugin.ts):
extend `SessionPlugin<Config, Deps>`, and whoever registers you binds config with `Plugin.with(config, deps)`
(pass `null` explicitly when there's none). Override `attach()` for custom wiring; use the decorators for the
common cases:

- `@PluginEvent(WAHAEvents.MESSAGE)` - the method receives the session's event observable once and
  subscribes itself (see `MessageLoggerPlugin` above, and
  [session.plugin.events.ts](https://github.com/devlikeapro/waha/blob/core/src/core/abc/session.plugin.events.ts)).
- `@PluginHook((hooks) => hooks.wid.chat, { stage: Stage.FIRST })` - taps the method into a session hook
  ([session.plugin.hooks.ts](https://github.com/devlikeapro/waha/blob/core/src/core/abc/session.plugin.hooks.ts)).

The available hooks are defined in
[src/core/abc/session.hooks.ts](https://github.com/devlikeapro/waha/blob/core/src/core/abc/session.hooks.ts)
(built on [tapable](https://github.com/webpack/tapable)):

| Hook | Type | Purpose |
|---|---|---|
| `activity` | series | Fired before an engine method that calls WhatsApp servers. |
| `session.info` | waterfall | Enrich the session info returned by the API. |
| `wid.chat`, `wid.mention` | waterfall | Transform a chat id / mention supplied by the API caller before the engine uses it. |
| `message.sent` | sync | Fired with the message id when a message is sent via the API. |
| `message.source` | bail | Resolve whether a message came from the API or the app. |

The smallest real plugin - the whole class, from
[waha-wid-suffix](https://github.com/devlikeapro/waha/blob/core/src/modules/waha-wid-suffix/WidEnsureSuffixPlugin.ts):

```typescript { title="WidEnsureSuffixPlugin.ts" }
export class WidEnsureSuffixPlugin extends SessionPlugin {
  @PluginHook((hooks) => hooks.wid.chat, { stage: Stage.FIRST })
  @PluginHook((hooks) => hooks.wid.mention, { stage: Stage.FIRST })
  ensureWidSuffix(wid: string): string {
    return ensureSuffix(wid);
  }
}
```

Plugins can be specialized per engine - subclass the base plugin and override behavior; hook taps are
inherited. Brazilian Phone Numbers ships `BrazilianPhoneGowsPlugin` and `BrazilianPhoneNowebPlugin`
on top of one core plugin.

How it all comes together on session start
([manager.core.ts](https://github.com/devlikeapro/waha/blob/core/src/core/manager.core.ts)):
module plugins are added first, then app plugins, then all of them are attached in one pass,
and only then the session starts.

### 🏭 Engines and Core

The last resort - for changes to the **main WhatsApp functionality itself**: a new built-in feature
every engine should support, or a bug in how an engine behaves. If your change can live in an app,
a module or a plugin - put it there instead; core and engine changes get the slowest, most careful review.

The map:

- `src/api/` - REST controllers and the WebSocket gateway.
- `src/core/services/SessionService.ts` - the business layer between controllers and the session manager.
- `src/core/abc/` - the abstractions: `WhatsappSession`
  ([session.abc.ts](https://github.com/devlikeapro/waha/blob/core/src/core/abc/session.abc.ts)) and
  `SessionManager` ([manager.abc.ts](https://github.com/devlikeapro/waha/blob/core/src/core/abc/manager.abc.ts)).
- `src/core/engines/{webjs,noweb,gows,wpp}/` - the engine implementations; each maps the abstract session
  methods onto its library (see [Repositories](#repositories) for the engine repos themselves).
- `src/structures/` - DTOs and enums, including all `WAHAEvents`.

Ground rules for this layer:

- A new API method should be implemented **across all engines** where possible; where it's not,
  throw `NotImplementedByEngineError`.
- Decorate engine methods that call WhatsApp servers with `@Activity()` - it keeps the session's presence
  and activity tracking correct.
- Follow [How to start](#how-to-start) to run everything locally, and [Contribution](#contribution)
  for how to split the work between the WAHA repo and the engine forks.

## Update

The pattern is the same for every Node.js engine: **point WAHA at your local checkout**, iterate,
then push the branch to the fork and bump the reference in `package.json`.

`yarn link` writes a `resolutions` entry into `package.json` - revert it before committing.

### WEBJS

```bash
cd ~/devlikeapro/waha
yarn link ../webjs
WHATSAPP_DEFAULT_ENGINE=WEBJS yarn start
```

Plain JavaScript, no build step. Restart WAHA to pick up changes.

When you're done - push your branch to the fork and update the reference:

```bash
make up-webjs   # yarn up whatsapp-web.js@github:devlikeapro/whatsapp-web.js#fork-main-<date>
```

Edit the branch name inside the `Makefile` target when you cut a new fork branch.

### NOWEB

**NOWEB** is TypeScript and must be built before WAHA can use it:

```bash
cd ~/devlikeapro/noweb
yarn install && yarn build   # emits lib/

cd ~/devlikeapro/waha
yarn link ../noweb
WHATSAPP_DEFAULT_ENGINE=NOWEB yarn start
```

It's ESM-only - WAHA loads it through the bridge in `src/vendor/esm.ts`.

To update the pinned fork: `make up-noweb`.

### GOWS

**GOWS** is a Go binary that WAHA spawns and talks to over gRPC on a unix socket.
Build it from the WAHA folder:

```bash
cd ~/devlikeapro/waha
make gows   # runs `make all` in ../gows -> ../gows/bin/gows
```

Then point WAHA at the binary you just built:

```bash
export WAHA_GOWS_PATH=../gows/bin/gows
export WAHA_GOWS_SOCKET=/tmp/gows.sock
WHATSAPP_DEFAULT_ENGINE=GOWS yarn start
```

To work on `whatsmeow` itself, replace the fork with your local checkout:

```bash
cd ~/devlikeapro/gows/src
go mod edit -replace go.mau.fi/whatsmeow=../../whatsmeow
```

Revert that before committing - the committed `go.mod` must point at the `devlikeapro/whatsmeow` fork.

If you change the gRPC contract in `gows/proto/*.proto`, regenerate both sides:

```bash
cd ~/devlikeapro/waha
make gows         # regenerates Go stubs (make build-proto in ../gows)
make proto-gows   # regenerates TypeScript stubs from ../gows/proto
```

### WPP

```bash
cd ~/devlikeapro/wa-js
npm install && npm run build:prd

cd ~/devlikeapro/waha
yarn link ../wa-js
WHATSAPP_DEFAULT_ENGINE=WPP yarn start
```

**WPP** is not forked, so changes here belong upstream in
[wppconnect-team](https://github.com/wppconnect-team). To pull the latest upstream: `make up-wpp`.

### Dashboard

The dashboard lives in `waha-hub/ui` (Nuxt). Run it against a locally running WAHA:

```bash
cd ~/devlikeapro/waha-hub/ui
yarn install
yarn dev-3001     # http://localhost:3001
```

There's also `yarn dev`, but it serves on `:3000` - the port WAHA itself already runs on -
so in practice we always use `yarn dev-3001` and keep WAHA on `:3000`.

To serve your build from WAHA itself:

```bash
cd ~/devlikeapro/waha-hub/ui
make dev          # build + copy into the WAHA dashboard folders
```

Shipped images don't build the UI - they download the pinned artifact from `devlikeapro/dashboard`.
Bump it with `make up-dashboard` in the WAHA folder, which resolves the latest `gh-pages` SHA into `waha.config.json`.

### Docs

```bash
cd ~/devlikeapro/waha-docs
npm install
npm run dev       # http://localhost:1313
```

Pages live under `content/docs/`. Each page is a folder with `index.md` and its images;
`weight` in the front matter controls the order in the sidebar.

## Contribution

For **new functionality**, start from [Extending WAHA](#extending-waha) and pick the highest layer that fits -
an app, a module or a plugin. [Pull requests](https://github.com/devlikeapro/waha/pulls) that keep their changes
contained there, with minimal edits to the core code and engines, are reviewed fastest and are likely to be accepted.

For **bug fixes**, start by **reproducing the problem against a locally running WAHA** and noting **which engine**
is affected - the same symptom often has a different cause in **WEBJS** than in **NOWEB**.

Fix it **in the engine repository** if it's engine behaviour, and **in `waha`** if it's API behaviour -
sessions, webhooks, storages, and everything the REST API exposes. Then `yarn link` your engine checkout
and **verify the fix end to end through the WAHA API**, not only in the library itself.

Open a **pull request to the engine fork first**, then a **second pull request to WAHA** that bumps the
reference in `package.json` (or `waha.config.json` for **GOWS** and the dashboard). Finally, add a
**changelog entry**, and when the behaviour is visible to users - **update these docs** in the same change.
