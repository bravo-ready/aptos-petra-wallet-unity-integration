using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using System.Runtime.InteropServices;

public class MenuUI : MonoBehaviour 
{
	[DllImport("__Internal")]
    private static extern void ConnectWallet();
	[DllImport("__Internal")]
    private static extern void DisconnectWallet();
	[DllImport("__Internal")]
    private static extern void SignTransactionAndSendMoney();

	[SerializeField] private Button ConnectWalletButton;
    [SerializeField] private GameObject ConnectPetraWalletText;
	[SerializeField] private GameObject ConnectingText;
	[SerializeField] private Button PlayButton;
	[SerializeField] private GameObject PayText;
	[SerializeField] private GameObject PayingText;
	[SerializeField] private Button DisconnectButton;

    // Called when the connect wallet button is pressed
    public void ConnectPetra()
	{
		// Deactivate button
        ConnectWalletButton.interactable = false;
        // Change text
        ConnectPetraWalletText.SetActive(false);
        ConnectingText.SetActive(true);
        // Open Petra Wallet
        ConnectWallet();
    }

	// Called when the ConnectWallet() function terminates with an error
	public void ConnectPetraError()
	{
		// Change text
		ConnectingText.SetActive(false);	
        ConnectPetraWalletText.SetActive(true);
        // Activate button
        ConnectWalletButton.interactable = true;
    }

	// Called when the ConnectWallet() function terminates successfully
	public void ConnectPetraSuccess()
	{
        // Hide connect wallet button
        ConnectWalletButton.gameObject.SetActive(false);
        // Activate button
        ConnectWalletButton.interactable = true;
		// Change text
		ConnectingText.SetActive(false);
		ConnectPetraWalletText.SetActive(true);
        
        // Show play button
        PlayButton.gameObject.SetActive(true);
        // Show disconnect button
        DisconnectButton.gameObject.SetActive(true);
    }

	// Called when the disconnect button is pressed
	public void DisconnectPetra()
	{
		DisconnectWallet();
	}

	// Called when the ConnectWallet() function terminates successfully
	public void DisconnectPetraSuccess()
	{
		// Hide play button
        PlayButton.gameObject.SetActive(false);
        // Hide disconnect button
        DisconnectButton.gameObject.SetActive(false);
		// Show connect wallet button
        ConnectWalletButton.gameObject.SetActive(true);
	}

	// Called when the pay and play button is pressed
	public void PayAndPlay()
	{
        // Deactivate button
        PlayButton.interactable = false;
        DisconnectButton.interactable = false;
        // Change text
        PayText.SetActive(false);
        PayingText.SetActive(true);
        // Sign and Pay
        SignTransactionAndSendMoney();
    }

	// Called when the SignTransactionAndSendMoney() function terminates with an error
	public void PayAndPlayError()
	{
		// Change text
		PayingText.SetActive(false);	
        PayText.SetActive(true);
        // Activate button
        PlayButton.interactable = true;
        DisconnectButton.interactable = true;
    }

	// Called when the SignTransactionAndSendMoney() function terminates successfully
	public void PayAndPlaySuccess()
	{
        // Load 'Game' scene
        Application.LoadLevel(1);
	}
}
