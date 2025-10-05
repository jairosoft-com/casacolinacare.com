/**
 * User Service
 *
 * API service for user-related operations.
 * Demonstrates how to organize API calls by domain.
 */

import apiClient from '../client';
import type { CreateUserRequest, UpdateUserRequest, User } from '../types';

export const userService = {
  /**
   * Get all users
   */
  async getAll() {
    return apiClient.get<User[]>('/users');
  },

  /**
   * Get user by ID
   */
  async getById(id: string) {
    return apiClient.get<User>(`/users/${id}`);
  },

  /**
   * Create a new user
   */
  async create(data: CreateUserRequest) {
    return apiClient.post<User, CreateUserRequest>('/users', data);
  },

  /**
   * Update a user
   */
  async update(id: string, data: UpdateUserRequest) {
    return apiClient.put<User, UpdateUserRequest>(`/users/${id}`, data);
  },

  /**
   * Delete a user
   */
  async delete(id: string) {
    return apiClient.delete<{ success: boolean }>(`/users/${id}`);
  },
};
