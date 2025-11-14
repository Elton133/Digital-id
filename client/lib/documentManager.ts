import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  createdAt: number;
  updatedAt: number;
  expiryDate?: number;
  imageUri?: string;
  metadata?: Record<string, any>;
  tags?: string[];
}

export interface DocumentCategory {
  id: string;
  name: string;
  icon: string;
  color: [string, string];
  documentCount: number;
}

const DOCUMENTS_KEY = 'documents_storage';
const CATEGORIES_KEY = 'document_categories';

/**
 * Get all documents
 */
export const getAllDocuments = async (): Promise<Document[]> => {
  try {
    const documentsJson = await AsyncStorage.getItem(DOCUMENTS_KEY);
    if (!documentsJson) return [];
    return JSON.parse(documentsJson);
  } catch (error) {
    console.error('Error getting documents:', error);
    return [];
  }
};

/**
 * Get documents by category
 */
export const getDocumentsByCategory = async (
  categoryId: string
): Promise<Document[]> => {
  try {
    const documents = await getAllDocuments();
    return documents.filter((doc) => doc.category === categoryId);
  } catch (error) {
    console.error('Error getting documents by category:', error);
    return [];
  }
};

/**
 * Add a new document
 */
export const addDocument = async (document: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>): Promise<Document> => {
  try {
    const documents = await getAllDocuments();
    const newDocument: Document = {
      ...document,
      id: Date.now().toString(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    documents.push(newDocument);
    await AsyncStorage.setItem(DOCUMENTS_KEY, JSON.stringify(documents));
    
    return newDocument;
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
};

/**
 * Update a document
 */
export const updateDocument = async (
  documentId: string,
  updates: Partial<Document>
): Promise<Document | null> => {
  try {
    const documents = await getAllDocuments();
    const index = documents.findIndex((doc) => doc.id === documentId);
    
    if (index === -1) return null;
    
    documents[index] = {
      ...documents[index],
      ...updates,
      updatedAt: Date.now(),
    };
    
    await AsyncStorage.setItem(DOCUMENTS_KEY, JSON.stringify(documents));
    return documents[index];
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

/**
 * Delete a document
 */
export const deleteDocument = async (documentId: string): Promise<boolean> => {
  try {
    const documents = await getAllDocuments();
    const filtered = documents.filter((doc) => doc.id !== documentId);
    await AsyncStorage.setItem(DOCUMENTS_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting document:', error);
    return false;
  }
};

/**
 * Search documents
 */
export const searchDocuments = async (query: string): Promise<Document[]> => {
  try {
    const documents = await getAllDocuments();
    const lowercaseQuery = query.toLowerCase();
    
    return documents.filter(
      (doc) =>
        doc.name.toLowerCase().includes(lowercaseQuery) ||
        doc.type.toLowerCase().includes(lowercaseQuery) ||
        doc.tags?.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
    );
  } catch (error) {
    console.error('Error searching documents:', error);
    return [];
  }
};

/**
 * Get expiring documents
 */
export const getExpiringDocuments = async (
  daysAhead: number = 30
): Promise<Document[]> => {
  try {
    const documents = await getAllDocuments();
    const now = Date.now();
    const futureDate = now + daysAhead * 24 * 60 * 60 * 1000;
    
    return documents.filter((doc) => {
      if (!doc.expiryDate) return false;
      return doc.expiryDate > now && doc.expiryDate <= futureDate;
    });
  } catch (error) {
    console.error('Error getting expiring documents:', error);
    return [];
  }
};

/**
 * Get expired documents
 */
export const getExpiredDocuments = async (): Promise<Document[]> => {
  try {
    const documents = await getAllDocuments();
    const now = Date.now();
    
    return documents.filter((doc) => {
      if (!doc.expiryDate) return false;
      return doc.expiryDate < now;
    });
  } catch (error) {
    console.error('Error getting expired documents:', error);
    return [];
  }
};

/**
 * Get all categories
 */
export const getAllCategories = async (): Promise<DocumentCategory[]> => {
  try {
    const categoriesJson = await AsyncStorage.getItem(CATEGORIES_KEY);
    if (!categoriesJson) {
      // Return default categories if none exist
      const defaultCategories: DocumentCategory[] = [
        {
          id: '1',
          name: "Government ID's",
          icon: 'document-text',
          color: ['#60A5FA', '#A78BFA'],
          documentCount: 0,
        },
        {
          id: '2',
          name: 'Documents',
          icon: 'folder',
          color: ['#34D399', '#10B981'],
          documentCount: 0,
        },
        {
          id: '3',
          name: 'Medical Records',
          icon: 'medical',
          color: ['#F87171', '#EF4444'],
          documentCount: 0,
        },
      ];
      await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(defaultCategories));
      return defaultCategories;
    }
    return JSON.parse(categoriesJson);
  } catch (error) {
    console.error('Error getting categories:', error);
    return [];
  }
};

/**
 * Add a new category
 */
export const addCategory = async (
  category: Omit<DocumentCategory, 'id' | 'documentCount'>
): Promise<DocumentCategory> => {
  try {
    const categories = await getAllCategories();
    const newCategory: DocumentCategory = {
      ...category,
      id: Date.now().toString(),
      documentCount: 0,
    };
    
    categories.push(newCategory);
    await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    
    return newCategory;
  } catch (error) {
    console.error('Error adding category:', error);
    throw error;
  }
};

/**
 * Update category
 */
export const updateCategory = async (
  categoryId: string,
  updates: Partial<DocumentCategory>
): Promise<DocumentCategory | null> => {
  try {
    const categories = await getAllCategories();
    const index = categories.findIndex((cat) => cat.id === categoryId);
    
    if (index === -1) return null;
    
    categories[index] = {
      ...categories[index],
      ...updates,
    };
    
    await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    return categories[index];
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

/**
 * Delete category
 */
export const deleteCategory = async (categoryId: string): Promise<boolean> => {
  try {
    // First check if there are documents in this category
    const documents = await getDocumentsByCategory(categoryId);
    if (documents.length > 0) {
      throw new Error('Cannot delete category with documents');
    }
    
    const categories = await getAllCategories();
    const filtered = categories.filter((cat) => cat.id !== categoryId);
    await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(filtered));
    
    return true;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

/**
 * Update document counts for all categories
 */
export const updateCategoryCounts = async (): Promise<void> => {
  try {
    const categories = await getAllCategories();
    const documents = await getAllDocuments();
    
    const updatedCategories = categories.map((cat) => ({
      ...cat,
      documentCount: documents.filter((doc) => doc.category === cat.id).length,
    }));
    
    await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(updatedCategories));
  } catch (error) {
    console.error('Error updating category counts:', error);
  }
};
