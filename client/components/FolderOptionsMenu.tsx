import React from 'react';
import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

interface FolderOptionsMenuProps {
  visible: boolean;
  onClose: () => void;
  folderName: string;
  onEdit: () => void;
  onShare: () => void;
  onDelete: () => void;
  anchorPosition?: { x: number; y: number };
}

const FolderOptionsMenu: React.FC<FolderOptionsMenuProps> = ({
  visible,
  onClose,
  folderName,
  onEdit,
  onShare,
  onDelete,
  anchorPosition = { x: 0, y: 0 },
}) => {
  const handleOption = async (action: () => void, actionName: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onClose();
    
    // Small delay to allow modal to close before action
    setTimeout(() => {
      action();
    }, 100);
  };

  const options = [
    {
      icon: 'create-outline' as const,
      label: 'Edit Folder',
      action: onEdit,
      color: '#3b82f6',
    },
    {
      icon: 'share-outline' as const,
      label: 'Share Folder',
      action: onShare,
      color: '#10b981',
    },
    {
      icon: 'trash-outline' as const,
      label: 'Delete Folder',
      action: () => {
        Alert.alert(
          'Delete Folder',
          `Are you sure you want to delete "${folderName}"? This action cannot be undone.`,
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: async () => {
                await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                onDelete();
              },
            },
          ]
        );
      },
      color: '#ef4444',
    },
  ];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity 
        className="flex-1 bg-black/50" 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View 
          className="absolute bg-white rounded-2xl shadow-2xl overflow-hidden"
          style={{
            top: anchorPosition.y + 10,
            right: 20,
            minWidth: 200,
          }}
        >
          {options.map((option, index) => (
            <React.Fragment key={option.label}>
              <TouchableOpacity
                onPress={() => handleOption(option.action, option.label)}
                className="flex-row items-center px-4 py-4 active:bg-gray-50"
              >
                <View 
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: `${option.color}15` }}
                >
                  <Ionicons name={option.icon} size={20} color={option.color} />
                </View>
                <Text 
                  style={{ fontFamily: 'Gilroy-SemiBold' }}
                  className="text-base"
                  color={option.color}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
              {index < options.length - 1 && (
                <View className="h-px bg-gray-100 mx-4" />
              )}
            </React.Fragment>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default FolderOptionsMenu;
