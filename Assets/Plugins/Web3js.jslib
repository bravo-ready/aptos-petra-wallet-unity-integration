mergeInto(LibraryManager.library, {
    ConnectWallet: async function () {
        // Petra injects an aptos object into the window of any web app the user visits
        const wallet = window.aptos;
        try {
            // Check if Petra Wallet is installed
            if (!wallet) {
                alert("Please install Petra Wallet!");
                throw "Petra Wallet not installed!";
            }
            // Connect to Petra Wallet
            await wallet.connect();
            // Check the network being used
            const network = await wallet.getNetwork();
            if (network.name != "Devnet") {
                alert("Please go to your Petra Wallet settings, switch the network to 'Devnet' and try again!");
                await wallet.disconnect();
                throw "Wrong network!";
            }
            // Set message text
            const msg = "This is a placeholder message.";
            // Get public key
            const { publicKey } = await wallet.account();
            // Remove the 0x prefix
            const key = publicKey.slice(2, 66);
            // Set message body
            let messageBody = {
                message: msg,
                publicKey: key
            }
            // Sign message
            let signedMessage = await wallet.signMessage(messageBody);
            // Add public key to object
            signedMessage.publicKey = key; // Can be removed if we can get the public key by the wallet address
            console.log(JSON.stringify(signedMessage));
            // Activate play button
            SendMessage("Camera", "ConnectPetraSuccess", JSON.stringify(signedMessage))            
        } catch (error) {
            console.error(error);
            // Reactivate button
            SendMessage("Camera", "ConnectPetraError");
        }
    },

    DisconnectWallet: async function () {
        // Petra injects an aptos object into the window of any web app the user visits
        const wallet = window.aptos;
        // Disconnect wallet
        await wallet.disconnect();
        // Adapt UI
        SendMessage("Camera", "DisconnectPetraSuccess");
    },

    SignTransactionAndSendMoney: async function () {
        // Petra injects an aptos object into the window of any web app the user visits
        const wallet = window.aptos;
        // 1 Aptos = 100_000_000 (= 8 decimals)
        const aptosDecimals = 100000000;
        // Set receiver
        const receiver = "0xe8b1e01243b2e0f5d41fe791eab7e300aabb3963cb0283b7cd22f8fb59e59640";
        // Set spawn fee
        const spawnFee = 0.1 * aptosDecimals;
        // Set payload of transaction
        const payload = {
            // Function type
            type: "entry_function_payload",
            // Function to be called
            // 0x1::coin::transfer => Only transfers coins if the account already exists on-chain
            // 0x1::aptos_account::transfer => Creates the account before the transaction if it doesn't exist yet
            function: "0x1::coin::transfer",
            // Type arguments associated with the function call
            type_arguments: ["0x1::aptos_coin::AptosCoin"],
            // Arguments of the function call
            arguments: [receiver, spawnFee],
        };
        // Set URL of Aptos node
        const nodeURL = "https://fullnode.devnet.aptoslabs.com";
        // Build a client configured to connect to an Aptos node at the given URL
        const client = new aptosSDK.AptosClient(nodeURL);
        try {
            // Execute transaction
            const pendingTransaction = await wallet.signAndSubmitTransaction(payload);
            const transaction = await client.waitForTransactionWithResult(pendingTransaction.hash, true);
            console.log(transaction.hash);
            // Start the game
            SendMessage("Camera", "PayAndPlaySuccess");
        } catch (error) {
            console.error(error);
            // Reactivate button
            SendMessage("Camera", "PayAndPlayError");
        }        
    }
});