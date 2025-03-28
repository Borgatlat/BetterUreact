"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Modal } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    name: "User",
    age: "28",
    weight: "175",
    height: "5'10\"",
    fitnessGoal: "strength",
    weightUnit: "lbs",
    heightUnit: "imperial",
  })

  const [editMode, setEditMode] = useState(false)
  const [tempUserData, setTempUserData] = useState({ ...userData })
  const [goalModalVisible, setGoalModalVisible] = useState(false)

  const fitnessGoals = [
    { id: "strength", title: "Strength", description: "Focus on building raw power and functional strength" },
    { id: "muscle", title: "Muscle Growth", description: "Maximize muscle hypertrophy and aesthetic development" },
    { id: "health", title: "Health & Wellness", description: "Improve overall health, longevity and quality of life" },
    {
      id: "athleticism",
      title: "Athleticism",
      description: "Enhance speed, agility, coordination and sports performance",
    },
    {
      id: "powerlifting",
      title: "Powerlifting",
      description: "Specialized strength training for competitive powerlifting",
    },
    { id: "weightloss", title: "Weight Loss", description: "Focus on fat loss and improving body composition" },
  ]

  const handleSave = () => {
    setUserData({ ...tempUserData })
    setEditMode(false)
    Alert.alert("Success", "Profile updated successfully!")
  }

  const handleCancel = () => {
    setTempUserData({ ...userData })
    setEditMode(false)
  }

  const selectGoal = (goalId) => {
    setTempUserData({ ...tempUserData, fitnessGoal: goalId })
    setGoalModalVisible(false)
  }

  const getGoalTitle = (goalId) => {
    const goal = fitnessGoals.find((g) => g.id === goalId)
    return goal ? goal.title : "Not set"
  }

  const toggleWeightUnit = () => {
    if (tempUserData.weightUnit === "lbs") {
      // Convert lbs to kg
      const weightInKg = Math.round(Number.parseFloat(tempUserData.weight) * 0.453592)
      setTempUserData({
        ...tempUserData,
        weight: weightInKg.toString(),
        weightUnit: "kg",
      })
    } else {
      // Convert kg to lbs
      const weightInLbs = Math.round(Number.parseFloat(tempUserData.weight) * 2.20462)
      setTempUserData({
        ...tempUserData,
        weight: weightInLbs.toString(),
        weightUnit: "lbs",
      })
    }
  }

  const toggleHeightUnit = () => {
    if (tempUserData.heightUnit === "imperial") {
      // Convert ft/in to cm
      const heightParts = tempUserData.height.split("'")
      const feet = Number.parseInt(heightParts[0])
      const inches = Number.parseInt(heightParts[1].replace('"', ""))
      const totalInches = feet * 12 + inches
      const heightInCm = Math.round(totalInches * 2.54)

      setTempUserData({
        ...tempUserData,
        height: heightInCm.toString(),
        heightUnit: "metric",
      })
    } else {
      // Convert cm to ft/in
      const cm = Number.parseFloat(tempUserData.height)
      const totalInches = cm / 2.54
      const feet = Math.floor(totalInches / 12)
      const inches = Math.round(totalInches % 12)

      setTempUserData({
        ...tempUserData,
        height: `${feet}'${inches}"`,
        heightUnit: "imperial",
      })
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        {!editMode ? (
          <TouchableOpacity style={styles.editButton} onPress={() => setEditMode(true)}>
            <Ionicons name="create-outline" size={24} color="cyan" />
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.editActions}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.profileImageContainer}>
        <View style={styles.profileImage}>
          <Ionicons name="person" size={80} color="cyan" />
        </View>
        {editMode && (
          <TouchableOpacity style={styles.changePhotoButton}>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Name</Text>
          {editMode ? (
            <TextInput
              style={styles.infoInput}
              value={tempUserData.name}
              onChangeText={(text) => setTempUserData({ ...tempUserData, name: text })}
            />
          ) : (
            <Text style={styles.infoValue}>{userData.name}</Text>
          )}
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Age</Text>
          {editMode ? (
            <TextInput
              style={styles.infoInput}
              value={tempUserData.age}
              onChangeText={(text) => setTempUserData({ ...tempUserData, age: text })}
              keyboardType="numeric"
            />
          ) : (
            <Text style={styles.infoValue}>{userData.age}</Text>
          )}
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Weight</Text>
          {editMode ? (
            <View style={styles.unitInputContainer}>
              <TextInput
                style={[styles.infoInput, { flex: 1 }]}
                value={tempUserData.weight}
                onChangeText={(text) => setTempUserData({ ...tempUserData, weight: text })}
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.unitToggle} onPress={toggleWeightUnit}>
                <Text style={styles.unitToggleText}>{tempUserData.weightUnit}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.infoValue}>
              {userData.weight} {userData.weightUnit}
            </Text>
          )}
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Height</Text>
          {editMode ? (
            <View style={styles.unitInputContainer}>
              <TextInput
                style={[styles.infoInput, { flex: 1 }]}
                value={tempUserData.height}
                onChangeText={(text) => setTempUserData({ ...tempUserData, height: text })}
              />
              <TouchableOpacity style={styles.unitToggle} onPress={toggleHeightUnit}>
                <Text style={styles.unitToggleText}>{tempUserData.heightUnit === "imperial" ? "ft/in" : "cm"}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.infoValue}>
              {userData.height} {userData.heightUnit === "imperial" ? "" : "cm"}
            </Text>
          )}
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Fitness Goal</Text>
          {editMode ? (
            <TouchableOpacity style={styles.goalSelector} onPress={() => setGoalModalVisible(true)}>
              <Text style={styles.goalSelectorText}>{getGoalTitle(tempUserData.fitnessGoal)}</Text>
              <Ionicons name="chevron-down" size={20} color="white" />
            </TouchableOpacity>
          ) : (
            <Text style={styles.infoValue}>{getGoalTitle(userData.fitnessGoal)}</Text>
          )}
        </View>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Your Stats</Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>PR Goals</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Days Streak</Text>
          </View>
        </View>
      </View>

      <View style={styles.actionsSection}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="settings-outline" size={24} color="white" />
          <Text style={styles.actionButtonText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="help-circle-outline" size={24} color="white" />
          <Text style={styles.actionButtonText}>Help & Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="log-out-outline" size={24} color="white" />
          <Text style={styles.actionButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Goal Selection Modal */}
      <Modal
        visible={goalModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setGoalModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Fitness Goal</Text>
              <TouchableOpacity onPress={() => setGoalModalVisible(false)}>
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.goalList}>
              {fitnessGoals.map((goal) => (
                <TouchableOpacity
                  key={goal.id}
                  style={[styles.goalOption, tempUserData.fitnessGoal === goal.id ? styles.goalOptionSelected : {}]}
                  onPress={() => selectGoal(goal.id)}
                >
                  <Text style={styles.goalTitle}>{goal.title}</Text>
                  <Text style={styles.goalDescription}>{goal.description}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButtonText: {
    color: "cyan",
    fontSize: 16,
    marginLeft: 5,
  },
  editActions: {
    flexDirection: "row",
  },
  cancelButton: {
    marginRight: 15,
    padding: 8,
  },
  cancelButtonText: {
    color: "#aaa",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "cyan",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  profileImageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(0, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(0, 255, 255, 0.3)",
  },
  changePhotoButton: {
    marginTop: 10,
  },
  changePhotoText: {
    color: "cyan",
    fontSize: 16,
  },
  infoSection: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  infoLabel: {
    color: "#aaa",
    fontSize: 16,
  },
  infoValue: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  infoInput: {
    color: "white",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 255, 0.3)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    minWidth: 100,
    textAlign: "right",
  },
  unitInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  unitToggle: {
    backgroundColor: "rgba(0, 255, 255, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 10,
  },
  unitToggleText: {
    color: "cyan",
    fontSize: 14,
  },
  goalSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 255, 255, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  goalSelectorText: {
    color: "white",
    fontSize: 16,
    marginRight: 10,
  },
  statsSection: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    color: "cyan",
    fontSize: 24,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 5,
  },
  actionsSection: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 40,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#222",
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 255, 0.3)",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  goalList: {
    maxHeight: 400,
  },
  goalOption: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  goalOptionSelected: {
    borderColor: "cyan",
    backgroundColor: "rgba(0, 255, 255, 0.1)",
  },
  goalTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  goalDescription: {
    color: "#aaa",
    fontSize: 14,
  },
})

export default ProfileScreen

