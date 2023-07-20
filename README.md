# Aptos Petra Wallet Unity Integration

## Glossary

- [Aptos](https://aptoslabs.com/) is a Layer 1 blockchain built with a Rust-based programming language called [Move](https://github.com/move-language/move)
- [Petra wallet](https://petra.app/) is a crypto wallet on Aptos built by Aptos Labs
- [Unity](https://unity.com) is a cross-platform game engine developed by Unity Technologies

## Why?

You want to develop a game with pay-to-spawn functionality or NFT integration on the Aptos blockchain.

## How?

- [How to connect/disconnect to Petra wallet?](https://petra.app/docs/connect-to-petra)
- [How to sign a message with Petra wallet?](https://petra.app/docs/signing-a-message)
- [How to send a transaction with Petra wallet?](https://petra.app/docs/sending-a-transaction)
- [How to communicate between the browser and the WebGL build?](https://docs.unity3d.com/Manual/webgl-interactingwithbrowserscripting.html)

## Core Components

The implementation consists of two core components

- [Web3js.jslib](/Assets/Plugins/Web3js.jslib)
    - Communication between JavaScript and browser
    - Communication between JavaScript and C# (see `SendMessage` functions)
- [MenuUI.cs](/Assets/BlockBreakerTemplate/Scripts/MenuUI.cs)
    - Communication between C# and JavaScript (see functions with the [attribute](https://docs.unity3d.com/Manual/Attributes.html) `[DllImport("__Internal")]`)

**Note**

If you want to send transactions with your Petra wallet (or realize any other interaction with the blockchain), you need to add the [Aptos SDK](https://aptos.dev/sdks/index/) to your code.

In our case we added the line

```
<script type="text/javascript" src="https://unpkg.com/aptos@1.10.0/dist/index.global.js"></script>
```
to the [index.html](/Assets/WebGLTemplates/BetterMinimal/index.html) of the WebGL template.

## Live Demo

https://aptos-petra-wallet-unity-integration-build.vercel.app

*Preview*



## Credits

- [Block Breaker Template](https://assetstore.unity.com/packages/templates/packs/block-breaker-template-63173)
- [Better Minimal WebGL Template](https://seansleblanc.itch.io/better-minimal-webgl-template)