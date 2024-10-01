export class UsbModemService {
  private device: USBDevice | null = null;

  // Function to request access to the modem
  async requestModem(vendorId: number, productId: number): Promise<void> {
    try {
      // Request the device with the specified vendorId and productId
      this.device = await navigator.usb.requestDevice({
        filters: [{ vendorId, productId }],
      });

      // If the device is successfully connected
      if (this.device) {
        console.log('Device connected:', this.device);
        await this.device.open();
        console.log('Device opened successfully.');
      }
    } catch (error) {
      console.error('Error accessing USB device:', error);
    }
  }

  // Function to disconnect the device
  async disconnectDevice(): Promise<void> {
    if (this.device) {
      await this.device.close();
      console.log('Device disconnected');
      this.device = null;
    }
  }

  // Handle device disconnection
  handleDeviceDisconnect(): void {
    navigator.usb.addEventListener(
      'disconnect',
      (event: USBConnectionEvent) => {
        console.log('USB device disconnected:', event);
        this.device = null;
      }
    );
  }
}
