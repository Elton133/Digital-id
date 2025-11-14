import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import * as Haptics from 'expo-haptics';
import { generateQRCodeData, revokeShareableLink } from '@/lib/qrCodeUtils';

interface QRCodeModalProps {
  visible: boolean;
  onClose: () => void;
  cardData: any;
  cardTitle?: string;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({
  visible,
  onClose,
  cardData,
  cardTitle = 'Identity Card',
}) => {
  const [qrData, setQrData] = useState<string>('');
  const [expiresAt, setExpiresAt] = useState<number>(0);
  const [expirationMinutes, setExpirationMinutes] = useState<number>(30);
  const [token, setToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const qrRef = useRef<any>(null);

  React.useEffect(() => {
    if (visible) {
      generateQR();
    }
  }, [visible, expirationMinutes]);

  const generateQR = async () => {
    setIsLoading(true);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    try {
      const result = await generateQRCodeData(cardData, expirationMinutes);
      setQrData(result.qrData);
      setExpiresAt(result.expiresAt);
      
      // Extract token from qrData
      const parsed = JSON.parse(result.qrData);
      const tokenMatch = parsed.link.match(/\/share\/(.+)$/);
      if (tokenMatch) {
        setToken(tokenMatch[1]);
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      Alert.alert('Error', 'Failed to generate QR code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    try {
      await Share.share({
        message: `Scan this QR code to access my ${cardTitle}. This link expires at ${new Date(expiresAt).toLocaleString()}.`,
        title: `Share ${cardTitle}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleRevoke = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    Alert.alert(
      'Revoke Access',
      'Are you sure you want to revoke this QR code? It will no longer be valid.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Revoke',
          style: 'destructive',
          onPress: async () => {
            if (token) {
              await revokeShareableLink(token);
              await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              Alert.alert('Revoked', 'QR code has been revoked');
              onClose();
            }
          },
        },
      ]
    );
  };

  const formatTimeRemaining = () => {
    const now = Date.now();
    const remaining = expiresAt - now;
    
    if (remaining <= 0) return 'Expired';
    
    const minutes = Math.floor(remaining / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

  const expirationOptions = [
    { label: '15 min', value: 15 },
    { label: '30 min', value: 30 },
    { label: '1 hour', value: 60 },
    { label: '2 hours', value: 120 },
    { label: '24 hours', value: 1440 },
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl p-6 min-h-[70%]">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <Text style={{ fontFamily: 'Gilroy-SemiBold' }} className="text-xl font-semibold text-gray-800">
              Share {cardTitle}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* QR Code */}
          <View className="items-center justify-center bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-100">
            {qrData ? (
              <QRCode
                value={qrData}
                size={200}
                backgroundColor="white"
                color="black"
                getRef={qrRef}
              />
            ) : (
              <View className="w-52 h-52 bg-gray-100 rounded-xl items-center justify-center">
                <Text style={{ fontFamily: 'Gilroy-Regular' }} className="text-gray-500">
                  Generating...
                </Text>
              </View>
            )}
          </View>

          {/* Expiration Info */}
          <View className="bg-blue-50 rounded-xl p-4 mb-6">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <Ionicons name="time-outline" size={20} color="#3b82f6" />
                <Text style={{ fontFamily: 'Gilroy-Regular' }} className="text-blue-700 ml-2">
                  Expires in {formatTimeRemaining()}
                </Text>
              </View>
              <Text style={{ fontFamily: 'Gilroy-Regular' }} className="text-blue-600 text-xs">
                {new Date(expiresAt).toLocaleTimeString()}
              </Text>
            </View>
          </View>

          {/* Expiration Options */}
          <Text style={{ fontFamily: 'Gilroy-SemiBold' }} className="text-sm text-gray-700 mb-3">
            Set Expiration Time
          </Text>
          <View className="flex-row flex-wrap gap-2 mb-6">
            {expirationOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={async () => {
                  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setExpirationMinutes(option.value);
                }}
                className={`px-4 py-2 rounded-full ${
                  expirationMinutes === option.value
                    ? 'bg-[#003554]'
                    : 'bg-gray-100'
                }`}
              >
                <Text
                  style={{ fontFamily: 'Gilroy-SemiBold' }}
                  className={`text-sm ${
                    expirationMinutes === option.value
                      ? 'text-white'
                      : 'text-gray-700'
                  }`}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={handleShare}
              className="flex-1 bg-[#003554] rounded-xl py-4 flex-row items-center justify-center"
            >
              <Ionicons name="share-outline" size={20} color="white" />
              <Text style={{ fontFamily: 'Gilroy-SemiBold' }} className="text-white ml-2">
                Share
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handleRevoke}
              className="px-6 bg-red-100 rounded-xl py-4 items-center justify-center"
            >
              <Ionicons name="close-circle-outline" size={20} color="#ef4444" />
            </TouchableOpacity>
          </View>

          {/* Security Note */}
          <View className="mt-4 flex-row items-start">
            <Ionicons name="shield-checkmark" size={16} color="#10b981" />
            <Text style={{ fontFamily: 'Gilroy-Regular' }} className="text-xs text-gray-600 ml-2 flex-1">
              This QR code contains an encrypted link. No personal data is transmitted to our servers.
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default QRCodeModal;
