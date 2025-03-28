"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Switch,
  Alert,
  ScrollView,
  Modal,
} from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"

// Add these imports at the top of the file
import workoutData from "./data/workoutData"
import ProfileScreenComponent from "./screens/ProfileScreen"
import ShopScreenComponent from "./screens/ShopScreen"

// Create navigators
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

// Workout data
const workoutDataOriginal = {
  strength: {
    title: "Strength Training",
    workouts: [
      {
        id: 1,
        title: "Full-Body Strength",
        description: "Build functional strength across all major muscle groups",
        difficulty: "Medium",
        duration: "45 min",
        exercises: [
          {
            id: 1,
            name: "Barbell Squats",
            icon: "barbell",
            sets: 4,
            reps: "6-8",
            rest: "2-3 min",
            instructions:
              "Stand with feet shoulder-width apart, barbell across upper back. Bend knees and hips to lower until thighs are parallel to floor. Push through heels to return to start.",
          },
          {
            id: 2,
            name: "Deadlifts",
            icon: "weight",
            sets: 4,
            reps: "5-6",
            rest: "3 min",
            instructions:
              "Stand with feet hip-width apart, barbell over mid-foot. Bend at hips and knees to grip bar. Keep back flat, drive through heels to stand up straight.",
          },
          {
            id: 3,
            name: "Bench Press",
            icon: "bench",
            sets: 4,
            reps: "6-8",
            rest: "2-3 min",
            instructions:
              "Lie on bench with feet flat on floor. Grip barbell slightly wider than shoulder width. Lower bar to chest, then press back up to starting position.",
          },
          {
            id: 4,
            name: "Overhead Press",
            icon: "dumbbell",
            sets: 3,
            reps: "8-10",
            rest: "2 min",
            instructions:
              "Stand with feet shoulder-width apart, hold barbell at shoulder height. Press weight overhead until arms are fully extended. Lower back to shoulders.",
          },
        ],
      },
      {
        id: 2,
        title: "Lower Body Power",
        description: "Focus on developing strength in legs and posterior chain",
        difficulty: "Hard",
        duration: "40 min",
        exercises: [
          {
            id: 1,
            name: "Back Squats",
            icon: "barbell",
            sets: 5,
            reps: "5",
            rest: "3 min",
            instructions:
              "Position barbell on upper back, feet shoulder-width apart. Squat down until thighs are parallel to floor or lower. Drive through heels to stand.",
          },
          {
            id: 2,
            name: "Romanian Deadlifts",
            icon: "weight",
            sets: 4,
            reps: "6-8",
            rest: "2-3 min",
            instructions:
              "Hold barbell in front of thighs, feet hip-width apart. Hinge at hips, sending butt back while keeping back flat. Lower until you feel hamstring stretch, then return to start.",
          },
          {
            id: 3,
            name: "Bulgarian Split Squats",
            icon: "lunge",
            sets: 3,
            reps: "8-10 each leg",
            rest: "90 sec",
            instructions:
              "Place one foot on bench behind you, other foot forward. Lower until back knee nearly touches floor. Push through front heel to return to start.",
          },
          {
            id: 4,
            name: "Weighted Calf Raises",
            icon: "legs",
            sets: 4,
            reps: "12-15",
            rest: "60 sec",
            instructions:
              "Stand on edge of platform with heels hanging off. Hold weights at sides. Rise up onto toes as high as possible, then lower heels below platform level.",
          },
        ],
      },
    ],
  },
  muscle: {
    title: "Muscle Building",
    workouts: [
      {
        id: 1,
        title: "Upper Body Hypertrophy",
        description: "Maximize muscle growth in chest, back, and arms",
        difficulty: "Medium",
        duration: "50 min",
        exercises: [
          {
            id: 1,
            name: "Incline Dumbbell Press",
            icon: "dumbbell",
            sets: 4,
            reps: "8-12",
            rest: "60-90 sec",
            instructions:
              "Lie on incline bench with dumbbells at shoulder level. Press weights up until arms are extended. Lower weights back to starting position with control.",
          },
          {
            id: 2,
            name: "Cable Rows",
            icon: "cable",
            sets: 4,
            reps: "10-12",
            rest: "60-90 sec",
            instructions:
              "Sit at cable row machine, feet against platform. Grab handle with both hands, pull toward lower chest while keeping back straight. Return to start with control.",
          },
          {
            id: 3,
            name: "Lateral Raises",
            icon: "dumbbell",
            sets: 3,
            reps: "12-15",
            rest: "60 sec",
            instructions:
              "Stand with dumbbells at sides. Raise arms out to sides until parallel with floor. Lower with control.",
          },
          {
            id: 4,
            name: "EZ Bar Curls",
            icon: "barbell",
            sets: 3,
            reps: "10-12",
            rest: "60 sec",
            instructions:
              "Hold EZ bar with underhand grip. Keeping elbows at sides, curl bar toward shoulders. Lower with control.",
          },
          {
            id: 5,
            name: "Tricep Pushdowns",
            icon: "cable",
            sets: 3,
            reps: "12-15",
            rest: "60 sec",
            instructions:
              "Stand at cable machine with rope attachment. Push rope down by extending arms, keeping elbows at sides. Return to start with control.",
          },
        ],
      },
      {
        id: 2,
        title: "Leg Mass Builder",
        description: "Develop size and definition in quadriceps, hamstrings, and calves",
        difficulty: "Hard",
        duration: "45 min",
        exercises: [
          {
            id: 1,
            name: "Leg Press",
            icon: "machine",
            sets: 4,
            reps: "10-12",
            rest: "90 sec",
            instructions:
              "Sit in leg press machine with feet shoulder-width apart on platform. Lower weight by bending knees toward chest, then press back up without locking knees.",
          },
          {
            id: 2,
            name: "Walking Lunges",
            icon: "lunge",
            sets: 3,
            reps: "12-15 each leg",
            rest: "90 sec",
            instructions:
              "Hold dumbbells at sides. Step forward into lunge, lowering back knee toward floor. Push off front foot to bring back leg forward into next lunge step.",
          },
          {
            id: 3,
            name: "Leg Extensions",
            icon: "machine",
            sets: 3,
            reps: "12-15",
            rest: "60 sec",
            instructions:
              "Sit in leg extension machine with pads on lower shins. Extend knees to lift weight, pause at top, then lower with control.",
          },
          {
            id: 4,
            name: "Lying Leg Curls",
            icon: "machine",
            sets: 3,
            reps: "12-15",
            rest: "60 sec",
            instructions:
              "Lie face down on leg curl machine with pad against back of ankles. Curl heels toward buttocks, then lower with control.",
          },
          {
            id: 5,
            name: "Standing Calf Raises",
            icon: "legs",
            sets: 4,
            reps: "15-20",
            rest: "60 sec",
            instructions:
              "Stand on calf raise machine with balls of feet on platform. Rise up onto toes as high as possible, then lower heels below platform level.",
          },
        ],
      },
    ],
  },
  health: {
    title: "Health & Wellness",
    workouts: [
      {
        id: 1,
        title: "Full-Body Functional",
        description: "Improve overall fitness and daily movement patterns",
        difficulty: "Easy",
        duration: "30 min",
        exercises: [
          {
            id: 1,
            name: "Bodyweight Squats",
            icon: "squat",
            sets: 3,
            reps: "12-15",
            rest: "45 sec",
            instructions:
              "Stand with feet shoulder-width apart. Lower body by bending knees and hips as if sitting in a chair. Return to standing.",
          },
          {
            id: 2,
            name: "Push-Ups",
            icon: "pushup",
            sets: 3,
            reps: "8-12",
            rest: "45 sec",
            instructions:
              "Start in plank position with hands slightly wider than shoulders. Lower chest toward floor by bending elbows, then push back up.",
          },
          {
            id: 3,
            name: "Dumbbell Rows",
            icon: "dumbbell",
            sets: 3,
            reps: "12 each arm",
            rest: "45 sec",
            instructions:
              "Place one hand and knee on bench, other foot on floor. Hold dumbbell in free hand, pull toward hip while keeping back flat.",
          },
          {
            id: 4,
            name: "Glute Bridges",
            icon: "glutes",
            sets: 3,
            reps: "15",
            rest: "45 sec",
            instructions:
              "Lie on back with knees bent, feet flat on floor. Push through heels to lift hips toward ceiling, squeezing glutes at top. Lower with control.",
          },
          {
            id: 5,
            name: "Plank",
            icon: "core",
            sets: 3,
            reps: "30-60 sec",
            rest: "45 sec",
            instructions:
              "Start in push-up position, forearms on floor. Keep body in straight line from head to heels, engaging core throughout.",
          },
        ],
      },
      {
        id: 2,
        title: "Cardio & Core",
        description: "Boost cardiovascular health and strengthen your midsection",
        difficulty: "Medium",
        duration: "35 min",
        exercises: [
          {
            id: 1,
            name: "Jumping Jacks",
            icon: "cardio",
            sets: 3,
            reps: "30 sec",
            rest: "30 sec",
            instructions:
              "Stand with feet together, arms at sides. Jump feet out while raising arms overhead, then return to starting position.",
          },
          {
            id: 2,
            name: "Mountain Climbers",
            icon: "cardio",
            sets: 3,
            reps: "30 sec",
            rest: "30 sec",
            instructions:
              "Start in push-up position. Rapidly alternate bringing knees toward chest, keeping hips level.",
          },
          {
            id: 3,
            name: "Bicycle Crunches",
            icon: "core",
            sets: 3,
            reps: "20 each side",
            rest: "45 sec",
            instructions:
              "Lie on back with hands behind head, knees bent. Bring opposite elbow to knee while extending other leg, alternating sides.",
          },
          {
            id: 4,
            name: "Russian Twists",
            icon: "core",
            sets: 3,
            reps: "20 total",
            rest: "45 sec",
            instructions:
              "Sit with knees bent, feet off floor. Twist torso to tap hands on floor beside hips, alternating sides.",
          },
          {
            id: 5,
            name: "Burpees",
            icon: "cardio",
            sets: 3,
            reps: "10",
            rest: "60 sec",
            instructions:
              "Start standing, drop to push-up position, perform push-up, jump feet toward hands, then jump up with hands overhead.",
          },
        ],
      },
    ],
  },
  athleticism: {
    title: "Athletic Performance",
    workouts: [
      {
        id: 1,
        title: "Speed & Agility",
        description: "Enhance quickness, coordination, and reaction time",
        difficulty: "Medium",
        duration: "40 min",
        exercises: [
          {
            id: 1,
            name: "High Knees",
            icon: "cardio",
            sets: 4,
            reps: "30 sec",
            rest: "30 sec",
            instructions: "Run in place, lifting knees toward chest. Pump arms and stay on balls of feet.",
          },
          {
            id: 2,
            name: "Lateral Shuffles",
            icon: "agility",
            sets: 3,
            reps: "30 sec each direction",
            rest: "30 sec",
            instructions:
              "Start in athletic stance. Push off outside foot to shuffle sideways, then reverse direction.",
          },
          {
            id: 3,
            name: "Box Jumps",
            icon: "plyometric",
            sets: 4,
            reps: "8-10",
            rest: "60 sec",
            instructions: "Stand facing box. Hinge at hips, swing arms, and jump onto box. Step back down.",
          },
          {
            id: 4,
            name: "Dot Drills",
            icon: "agility",
            sets: 3,
            reps: "30 sec",
            rest: "30 sec",
            instructions:
              "Imagine 5 dots in X pattern on floor. Jump rapidly between dots in various patterns, staying on balls of feet.",
          },
          {
            id: 5,
            name: "Sprint Intervals",
            icon: "cardio",
            sets: 6,
            reps: "20 sec sprint, 40 sec walk",
            rest: "0 sec",
            instructions: "Sprint at maximum effort for 20 seconds, then walk for 40 seconds. Repeat.",
          },
        ],
      },
      {
        id: 2,
        title: "Power Development",
        description: "Build explosive strength for athletic movements",
        difficulty: "Hard",
        duration: "45 min",
        exercises: [
          {
            id: 1,
            name: "Medicine Ball Slams",
            icon: "medicine-ball",
            sets: 4,
            reps: "10-12",
            rest: "60 sec",
            instructions:
              "Hold medicine ball overhead. Forcefully throw ball to ground, bending at hips. Catch ball on bounce and repeat.",
          },
          {
            id: 2,
            name: "Kettlebell Swings",
            icon: "kettlebell",
            sets: 4,
            reps: "15",
            rest: "60 sec",
            instructions:
              "Stand with feet shoulder-width apart, kettlebell between feet. Hinge at hips, swing kettlebell between legs, then thrust hips forward to swing kettlebell to chest height.",
          },
          {
            id: 3,
            name: "Plyo Push-Ups",
            icon: "plyometric",
            sets: 3,
            reps: "8-10",
            rest: "90 sec",
            instructions:
              "Start in push-up position. Lower chest to floor, then push up explosively so hands leave floor. Land softly and repeat.",
          },
          {
            id: 4,
            name: "Jump Squats",
            icon: "plyometric",
            sets: 4,
            reps: "12",
            rest: "60 sec",
            instructions:
              "Stand with feet shoulder-width apart. Lower into squat, then explode upward into jump. Land softly and immediately lower into next rep.",
          },
          {
            id: 5,
            name: "Broad Jumps",
            icon: "plyometric",
            sets: 3,
            reps: "6-8",
            rest: "90 sec",
            instructions:
              "Stand with feet hip-width apart. Hinge at hips, swing arms back, then jump forward as far as possible. Step back to starting position and repeat.",
          },
        ],
      },
    ],
  },
}

// Define styles
const styles = StyleSheet.create({
  // Common styles
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "cyan",
    padding: 15,
    borderRadius: 25,
    marginVertical: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "rgba(34, 34, 34, 0.8)",
    borderRadius: 15,
    padding: 20,
    width: "90%",
    marginBottom: 15,
    shadowColor: "cyan",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
  },
  cardTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardText: {
    color: "#ccc",
    fontSize: 14,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 999,
  },
  loadingText: {
    color: "white",
    marginTop: 10,
  },
  tabContent: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#111",
    paddingTop: 20,
  },

  // Home screen styles
  homeHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 255, 255, 0.2)",
  },
  greeting: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  date: {
    color: "cyan",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 15,
    paddingHorizontal: 20,
    alignSelf: "flex-start",
  },
  workoutCard: {
    backgroundColor: "rgba(0, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 20,
    width: "90%",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 255, 0.3)",
  },
  workoutWeek: {
    color: "#aaa",
    fontSize: 14,
  },
  workoutTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
  },
  workoutProgress: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 15,
  },
  nextExercise: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nextExerciseText: {
    color: "#333",
    fontSize: 14,
  },
  nextExerciseTitle: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  recentPlans: {
    width: "100%",
    paddingHorizontal: 20,
  },
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  seeAll: {
    color: "cyan",
    fontSize: 14,
  },
  plansList: {
    flexDirection: "row",
    marginBottom: 20,
  },
  planItem: {
    alignItems: "center",
    marginRight: 20,
  },
  planIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(0, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  planName: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    width: 70,
  },

  // PR Goals styles
  prGoalsSection: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  prGoalCard: {
    backgroundColor: "rgba(0, 255, 255, 0.05)",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 255, 0.2)",
  },
  prGoalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  prGoalTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  prGoalValue: {
    color: "cyan",
    fontSize: 24,
    fontWeight: "bold",
  },
  prGoalTarget: {
    color: "#aaa",
    fontSize: 14,
  },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 4,
    marginTop: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "cyan",
    borderRadius: 4,
  },

  // Workout progress styles
  workoutProgressContainer: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
    justifyContent: "space-between",
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  optionsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  timerContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  timerLabel: {
    color: "#aaa",
    fontSize: 16,
    marginBottom: 10,
  },
  timer: {
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 20,
  },
  participantsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  participant: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: -5,
    borderWidth: 2,
    borderColor: "black",
  },
  participantCount: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -5,
  },
  participantCountText: {
    color: "white",
    fontSize: 14,
  },
  participantsText: {
    color: "#aaa",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 30,
  },
  dateSelector: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  dateItem: {
    alignItems: "center",
  },
  dateValue: {
    color: "#aaa",
    fontSize: 16,
  },
  activeDateItem: {
    backgroundColor: "rgba(0, 255, 255, 0.2)",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  activeDateValue: {
    color: "cyan",
  },
  workoutOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  workoutOptionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 0, 85, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  workoutOptionDetails: {
    flex: 1,
  },
  workoutOptionTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  workoutOptionDuration: {
    color: "#aaa",
    fontSize: 14,
  },
  workoutOptionStats: {
    alignItems: "flex-end",
  },
  workoutOptionDistance: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  workoutOptionCalories: {
    color: "#aaa",
    fontSize: 14,
  },

  // Split selector styles
  splitSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  splitOption: {
    width: "48%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    alignItems: "center",
  },
  splitOptionSelected: {
    borderColor: "cyan",
    backgroundColor: "rgba(0, 255, 255, 0.1)",
  },
  splitOptionUnselected: {
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  splitTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#222",
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 255, 0.3)",
  },
  modalTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalLabel: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 8,
  },
  modalInput: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "white",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  unitButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  unitButtonSelected: {
    backgroundColor: "rgba(0, 255, 255, 0.3)",
    borderColor: "cyan",
  },
  unitText: {
    color: "#aaa",
  },
  unitTextSelected: {
    color: "white",
    fontWeight: "bold",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalCancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  modalCancelText: {
    color: "#aaa",
    fontWeight: "bold",
  },
  modalSaveButton: {
    backgroundColor: "cyan",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  modalSaveText: {
    color: "black",
    fontWeight: "bold",
  },
  pickerContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  exerciseChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  exerciseChipSelected: {
    backgroundColor: "rgba(0, 255, 255, 0.3)",
    borderColor: "cyan",
  },
  exerciseChipText: {
    color: "#aaa",
  },
  exerciseChipTextSelected: {
    color: "white",
    fontWeight: "bold",
  },

  // Guide styles
  guideContent: {
    width: "90%",
    height: "80%",
    backgroundColor: "#111",
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 255, 0.3)",
    justifyContent: "space-between",
  },
  guideHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  guideTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  guideBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  guideStepTitle: {
    color: "cyan",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  guideStepContent: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    lineHeight: 26,
  },
  guideProgress: {
    width: "100%",
    marginTop: 40,
  },
  guideTimerOuter: {
    width: "100%",
    height: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 5,
    overflow: "hidden",
  },
  guideTimerInner: {
    height: "100%",
    backgroundColor: "cyan",
  },
  guideFooter: {
    marginTop: 20,
  },
  guideNextButton: {
    backgroundColor: "rgba(0, 255, 255, 0.2)",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  guideNextText: {
    color: "cyan",
    fontSize: 16,
    fontWeight: "bold",
  },
  guideCompleteButton: {
    backgroundColor: "cyan",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  guideCompleteText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
})

// Loading Component with fitness animation
const LoadingOverlay = ({ visible, message }) => {
  const [animationFrame, setAnimationFrame] = useState(0)

  useEffect(() => {
    let animationInterval
    if (visible) {
      // Start animation
      animationInterval = setInterval(() => {
        setAnimationFrame((prev) => (prev + 1) % 4)
      }, 300)
    }

    return () => {
      if (animationInterval) clearInterval(animationInterval)
    }
  }, [visible])

  // Animation frames for a simple lifting animation
  const getAnimationIcon = () => {
    switch (animationFrame) {
      case 0:
        return <Ionicons name="barbell-outline" size={50} color="cyan" />
      case 1:
        return <Ionicons name="barbell-sharp" size={60} color="cyan" />
      case 2:
        return <Ionicons name="fitness-outline" size={50} color="cyan" />
      case 3:
        return <Ionicons name="fitness" size={60} color="cyan" />
      default:
        return <Ionicons name="barbell-outline" size={50} color="cyan" />
    }
  }

  if (!visible) return null

  return (
    <View style={styles.loadingContainer}>
      <View style={{ alignItems: "center" }}>
        {getAnimationIcon()}
        <ActivityIndicator size="large" color="cyan" style={{ marginTop: 15 }} />
        <Text style={styles.loadingText}>{message}</Text>
      </View>
    </View>
  )
}

// Max Input Modal Component
const MaxInputModal = ({ visible, onClose, onSave }) => {
  const [exercise, setExercise] = useState("")
  const [currentMax, setCurrentMax] = useState("")
  const [targetMax, setTargetMax] = useState("")
  const [unit, setUnit] = useState("lbs")

  const exercises = [
    "Bench Press",
    "Squat",
    "Deadlift",
    "Overhead Press",
    "Barbell Row",
    "Pull-up",
    "Dip",
    "Hip Thrust",
  ]

  const handleSave = () => {
    if (!exercise || !currentMax || !targetMax) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    const newGoal = {
      id: Date.now(), // Use timestamp as ID
      exercise,
      current: Number.parseFloat(currentMax),
      target: Number.parseFloat(targetMax),
      unit,
    }

    onSave(newGoal)

    // Reset values
    setExercise("")
    setCurrentMax("")
    setTargetMax("")
    onClose()
  }

  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New PR Goal</Text>

          <Text style={styles.modalLabel}>Exercise</Text>
          <View style={styles.pickerContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {exercises.map((ex) => (
                <TouchableOpacity
                  key={ex}
                  style={[styles.exerciseChip, exercise === ex ? styles.exerciseChipSelected : null]}
                  onPress={() => setExercise(ex)}
                >
                  <Text style={[styles.exerciseChipText, exercise === ex ? styles.exerciseChipTextSelected : null]}>
                    {ex}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <Text style={styles.modalLabel}>Current Max</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.modalInput, { flex: 1 }]}
              keyboardType="numeric"
              value={currentMax}
              onChangeText={setCurrentMax}
              placeholder="Enter current max"
              placeholderTextColor="#666"
            />

            <TouchableOpacity
              style={[styles.unitButton, unit === "lbs" ? styles.unitButtonSelected : null]}
              onPress={() => setUnit("lbs")}
            >
              <Text style={unit === "lbs" ? styles.unitTextSelected : styles.unitText}>lbs</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.unitButton, unit === "kg" ? styles.unitButtonSelected : null]}
              onPress={() => setUnit("kg")}
            >
              <Text style={unit === "kg" ? styles.unitTextSelected : styles.unitText}>kg</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.modalLabel}>Target Max</Text>
          <TextInput
            style={styles.modalInput}
            keyboardType="numeric"
            value={targetMax}
            onChangeText={setTargetMax}
            placeholder="Enter target max"
            placeholderTextColor="#666"
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalCancelButton} onPress={onClose}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalSaveButton} onPress={handleSave}>
              <Text style={styles.modalSaveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

// Mental Workout Guide Component
const MentalWorkoutGuide = ({ visible, onClose, sessionType }) => {
  const [step, setStep] = useState(0)

  // Session content based on type
  const sessionContent = {
    meditation: [
      { title: "Find a Quiet Space", content: "Choose a place free from distractions where you can be comfortable." },
      { title: "Sit Comfortably", content: "Find a position that allows you to be both alert and relaxed." },
      {
        title: "Focus on Your Breath",
        content: "Close your eyes and pay attention to your natural breathing pattern.",
      },
      { title: "Be Present", content: "When your mind wanders, gently bring it back to your breath." },
      { title: "Complete", content: "Great job completing your meditation session." },
    ],
    stress: [
      {
        title: "Box Breathing",
        content: "Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold for 4 seconds. Repeat.",
      },
      {
        title: "Body Scan",
        content: "Start at your toes and work up to your head, noticing tension and releasing it.",
      },
      { title: "Visualization", content: "Imagine a peaceful place in detail using all your senses." },
      { title: "Mindful Movement", content: "Perform gentle stretches with full attention to bodily sensations." },
      { title: "Complete", content: "Well done! You've completed your stress management session." },
    ],
    sleep: [
      {
        title: "Prepare Your Space",
        content: "Dim the lights and make sure your sleeping area is cool and comfortable.",
      },
      { title: "Progressive Relaxation", content: "Tense and then relax each muscle group from toes to head." },
      { title: "Deep Breathing", content: "Take slow, deep breaths, focusing on the sensation of breathing." },
      { title: "Visualization", content: "Imagine a peaceful scene in detail as you drift off to sleep." },
      { title: "Complete", content: "Your sleep improvement session is complete. Sweet dreams!" },
    ],
  }

  const content = sessionContent[sessionType] || sessionContent.meditation
  const totalSteps = content.length

  // Timer for auto-advancing (for demo purposes)
  useEffect(() => {
    let timer
    if (visible) {
      // Reset step when opening
      setStep(0)

      if (step < totalSteps - 1) {
        timer = setTimeout(() => {
          setStep((prev) => prev + 1)
        }, 5000) // Auto advance every 5 seconds for demo
      }
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [step, visible, totalSteps])

  if (!visible) return null

  const currentContent = content[step]

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.guideContent}>
          <View style={styles.guideHeader}>
            <Text style={styles.guideTitle}>
              {step === totalSteps - 1 ? "Session Complete" : `Step ${step + 1} of ${totalSteps - 1}`}
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.guideBody}>
            <Text style={styles.guideStepTitle}>{currentContent.title}</Text>
            <Text style={styles.guideStepContent}>{currentContent.content}</Text>

            {step === totalSteps - 1 ? (
              <Ionicons name="checkmark-circle" size={80} color="cyan" style={{ marginTop: 30 }} />
            ) : (
              <View style={styles.guideProgress}>
                <View style={styles.guideTimerOuter}>
                  <View style={[styles.guideTimerInner, { width: `${((step + 1) / (totalSteps - 1)) * 100}%` }]} />
                </View>
              </View>
            )}
          </View>

          <View style={styles.guideFooter}>
            {step < totalSteps - 1 ? (
              <TouchableOpacity
                style={styles.guideNextButton}
                onPress={() => setStep((prev) => Math.min(prev + 1, totalSteps - 1))}
              >
                <Text style={styles.guideNextText}>Next Step</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.guideCompleteButton} onPress={onClose}>
                <Text style={styles.guideCompleteText}>Finish Session</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  )
}

// Helper function to get split name
const getSplitName = (splitId) => {
  const splitMap = {
    ppl: "Push/Pull/Legs",
    upper_lower: "Upper/Lower",
    full_body: "Full Body",
    bro: "Bro Split",
    arnold: "Arnold Split",
    custom: "Custom",
  }
  return splitMap[splitId] || "Full Body"
}

// Start Screen
const StartScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false)

  const handleGetStarted = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigation.navigate("Login")
    }, 1000)
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>BetterU</Text>
        <Text style={styles.subtitle}>Your personal fitness and wellness companion</Text>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
      <LoadingOverlay visible={loading} message="Loading..." />
    </View>
  )
}

// Login Screen
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    setLoading(true)
    setError("")

    // Mock login
    setTimeout(() => {
      setLoading(false)
      if (email === "test@example.com" && password === "password") {
        navigation.navigate("HomeTabs")
      } else {
        setError("Invalid email or password. Try test@example.com / password")
      }
    }, 1500)
  }

  return (
    <View style={styles.container}>
      <View style={{ width: "90%" }}>
        <Text style={styles.title}>BetterU</Text>

        <View
          style={{
            borderRadius: 20,
            overflow: "hidden",
            borderColor: "rgba(255, 255, 255, 0.2)",
            borderWidth: 1,
            marginBottom: 20,
            padding: 25,
          }}
        >
          <TextInput
            style={{
              width: "100%",
              height: 50,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "white",
              marginBottom: 15,
              paddingHorizontal: 15,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.2)",
            }}
            placeholder="Enter Email"
            placeholderTextColor="#888"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={{
              width: "100%",
              height: 50,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "white",
              marginBottom: 15,
              paddingHorizontal: 15,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.2)",
            }}
            placeholder="Enter Password"
            placeholderTextColor="#888"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />

          {error ? (
            <Text
              style={{
                color: "#ff6b6b",
                marginTop: 5,
                marginBottom: 10,
                fontSize: 12,
              }}
            >
              {error}
            </Text>
          ) : null}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text
            style={{
              color: "cyan",
              marginTop: 20,
              fontSize: 14,
              textAlign: "center",
            }}
          >
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      <LoadingOverlay visible={loading} message="Logging in..." />
    </View>
  )
}

// Sign Up Screen
const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)
    setError("")

    // Mock signup
    setTimeout(() => {
      setLoading(false)
      navigation.navigate("GetToKnow")
    }, 1500)
  }

  return (
    <View style={styles.container}>
      <View style={{ width: "90%" }}>
        <Text style={styles.title}>Sign Up</Text>

        <View
          style={{
            borderRadius: 20,
            overflow: "hidden",
            borderColor: "rgba(255, 255, 255, 0.2)",
            borderWidth: 1,
            marginBottom: 20,
            padding: 25,
          }}
        >
          <TextInput
            style={{
              width: "100%",
              height: 50,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "white",
              marginBottom: 15,
              paddingHorizontal: 15,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.2)",
            }}
            placeholder="Enter Email"
            placeholderTextColor="#888"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={{
              width: "100%",
              height: 50,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "white",
              marginBottom: 15,
              paddingHorizontal: 15,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.2)",
            }}
            placeholder="Enter Password"
            placeholderTextColor="#888"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={{
              width: "100%",
              height: 50,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "white",
              marginBottom: 15,
              paddingHorizontal: 15,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.2)",
            }}
            placeholder="Confirm Password"
            placeholderTextColor="#888"
            secureTextEntry
            autoCapitalize="none"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          {error ? (
            <Text
              style={{
                color: "#ff6b6b",
                marginTop: 5,
                marginBottom: 10,
                fontSize: 12,
              }}
            >
              {error}
            </Text>
          ) : null}

          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text
            style={{
              color: "cyan",
              marginTop: 20,
              fontSize: 14,
              textAlign: "center",
            }}
          >
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>

      <LoadingOverlay visible={loading} message="Creating your account..." />
    </View>
  )
}

// Get To Know Screen
const GetToKnowScreen = ({ navigation }) => {
  const [age, setAge] = useState("")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [useInches, setUseInches] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleNext = () => {
    setLoading(true)
    // Mock saving profile data
    setTimeout(() => {
      setLoading(false)
      navigation.navigate("GymQuestion")
    }, 1000)
  }

  return (
    <View style={styles.container}>
      <View style={{ width: "90%" }}>
        <Text style={styles.title}>Let Us Get To Know You</Text>

        <View
          style={{
            borderRadius: 20,
            overflow: "hidden",
            borderColor: "rgba(255, 255, 255, 0.2)",
            borderWidth: 1,
            marginBottom: 20,
            padding: 25,
          }}
        >
          <TextInput
            style={{
              width: "100%",
              height: 50,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "white",
              marginBottom: 15,
              paddingHorizontal: 15,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.2)",
            }}
            placeholder="Enter Age"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />
          <TextInput
            style={{
              width: "100%",
              height: 50,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "white",
              marginBottom: 15,
              paddingHorizontal: 15,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.2)",
            }}
            placeholder="Enter Weight (kg)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 15,
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <Text
              style={{
                color: "white",
                marginHorizontal: 5,
                fontSize: 12,
              }}
            >
              cm
            </Text>
            <Switch
              value={useInches}
              onValueChange={setUseInches}
              trackColor={{ false: "#333", true: "#333" }}
              thumbColor={useInches ? "cyan" : "#f4f3f4"}
            />
            <Text
              style={{
                color: "white",
                marginHorizontal: 5,
                fontSize: 12,
              }}
            >
              inches
            </Text>
          </View>

          <TextInput
            style={{
              width: "100%",
              height: 50,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "white",
              marginBottom: 15,
              paddingHorizontal: 15,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.2)",
            }}
            placeholder={`Enter Height (${useInches ? "inches" : "cm"})`}
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>

      <LoadingOverlay visible={loading} message="Saving your information..." />
    </View>
  )
}

// Gym Question Screen
const GymQuestionScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const [frequency, setFrequency] = useState(null)

  const handleSelection = (selectedFrequency) => {
    setFrequency(selectedFrequency)
    setLoading(true)
    // Mock saving workout frequency
    setTimeout(() => {
      setLoading(false)
      navigation.navigate("GoalsScreen")
    }, 1000)
  }

  return (
    <View style={styles.container}>
      <View style={{ width: "90%" }}>
        <Text style={styles.title}>How Often Do You Workout?</Text>

        <View
          style={{
            borderRadius: 20,
            overflow: "hidden",
            borderColor: "rgba(255, 255, 255, 0.2)",
            borderWidth: 1,
            marginBottom: 20,
            padding: 25,
          }}
        >
          <TouchableOpacity
            style={[styles.button, frequency === "Never" ? { backgroundColor: "rgba(0, 255, 255, 0.5)" } : null]}
            onPress={() => handleSelection("Never")}
          >
            <Text style={styles.buttonText}>Never</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              frequency === "1-2 times a week" ? { backgroundColor: "rgba(0, 255, 255, 0.5)" } : null,
            ]}
            onPress={() => handleSelection("1-2 times a week")}
          >
            <Text style={styles.buttonText}>1-2 times a week</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              frequency === "3-4 times a week" ? { backgroundColor: "rgba(0, 255, 255, 0.5)" } : null,
            ]}
            onPress={() => handleSelection("3-4 times a week")}
          >
            <Text style={styles.buttonText}>3-4 times a week</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              frequency === "5+ times a week" ? { backgroundColor: "rgba(0, 255, 255, 0.5)" } : null,
            ]}
            onPress={() => handleSelection("5+ times a week")}
          >
            <Text style={styles.buttonText}>5+ times a week</Text>
          </TouchableOpacity>
        </View>
      </View>

      <LoadingOverlay visible={loading} message="Processing your selection..." />
    </View>
  )
}

// Goals Screen
const GoalsScreen = ({ navigation }) => {
  const [selectedGoal, setSelectedGoal] = useState(null)
  const [loading, setLoading] = useState(false)

  const goals = [
    {
      id: "strength",
      title: "Strength",
      description: "Focus on building raw power and functional strength",
    },
    {
      id: "muscle",
      title: "Muscle Growth",
      description: "Maximize muscle hypertrophy and aesthetic development",
    },
    {
      id: "health",
      title: "Health & Wellness",
      description: "Improve overall health, longevity and quality of life",
    },
    {
      id: "athleticism",
      title: "Athleticism",
      description: "Enhance speed, agility, coordination and sports performance",
    },
  ]

  const handleGoalSelection = (goalId) => {
    setSelectedGoal(goalId)
  }

  const handleContinue = () => {
    if (!selectedGoal) {
      Alert.alert("Please select a goal")
      return
    }

    setLoading(true)
    // Mock saving selected goal
    setTimeout(() => {
      setLoading(false)
      navigation.navigate("HomeTabs")
    }, 1000)
  }

  return (
    <View style={styles.container}>
      <View style={{ width: "90%" }}>
        <Text style={styles.title}>What's Your Primary Goal?</Text>

        <View
          style={{
            borderRadius: 20,
            overflow: "hidden",
            borderColor: "rgba(255, 255, 255, 0.2)",
            borderWidth: 1,
            marginBottom: 20,
            padding: 25,
          }}
        >
          {goals.map((goal) => (
            <TouchableOpacity
              key={goal.id}
              style={[
                {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  borderRadius: 15,
                  padding: 20,
                  width: "100%",
                  marginBottom: 15,
                  borderWidth: 1,
                  alignItems: "flex-start",
                },
                selectedGoal === goal.id
                  ? {
                      borderColor: "cyan",
                      backgroundColor: "rgba(0, 255, 255, 0.1)",
                    }
                  : {
                      borderColor: "rgba(255, 255, 255, 0.2)",
                    },
              ]}
              onPress={() => handleGoalSelection(goal.id)}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 5,
                }}
              >
                {goal.title}
              </Text>
              <Text
                style={{
                  color: "#ccc",
                  fontSize: 14,
                }}
              >
                {goal.description}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>

      <LoadingOverlay visible={loading} message="Customizing your experience..." />
    </View>
  )
}

// Workout Detail Screen
const WorkoutDetailScreen = ({ route, navigation }) => {
  const { workout } = route.params

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "black" }}>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginBottom: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              paddingHorizontal: 15,
              paddingVertical: 8,
              borderRadius: 20,
              marginRight: 10,
            }}
          >
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
              }}
            >
              {workout.difficulty}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "white",
              paddingHorizontal: 15,
              paddingVertical: 8,
              borderRadius: 20,
              marginRight: 10,
            }}
          >
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
              }}
            >
              {workout.duration}
            </Text>
          </View>
        </View>

        <Text style={styles.workoutDetailTitle}>{workout.title}</Text>
        <Text
          style={{
            color: "#aaa",
            fontSize: 16,
            marginBottom: 20,
          }}
        >
          {workout.description}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: "cyan",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          marginVertical: 20,
        }}
        onPress={() => navigation.navigate("WorkoutProgress", { workout })}
      >
        <Ionicons name="play" size={30} color="black" />
      </TouchableOpacity>

      <Text style={[styles.sectionTitle, { marginLeft: 20 }]}>Exercises</Text>

      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
        }}
      >
        {workout.exercises.map((exercise) => (
          <TouchableOpacity
            key={exercise.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderRadius: 15,
              padding: 15,
              marginBottom: 15,
            }}
            onPress={() => navigation.navigate("ExerciseDetail", { exercise })}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: "rgba(0, 255, 255, 0.1)",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 15,
              }}
            >
              <Ionicons
                name={exercise.icon === "barbell" ? "barbell-outline" : "fitness-outline"}
                size={24}
                color="cyan"
              />
            </View>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                flex: 1,
              }}
            >
              {exercise.name}
            </Text>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

// Exercise Detail Screen
const ExerciseDetailScreen = ({ route }) => {
  const { exercise } = route.params

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "black",
        padding: 20,
      }}
    >
      <View
        style={{
          width: "100%",
          height: 250,
          borderRadius: 15,
          marginBottom: 20,
          backgroundColor: "rgba(0, 255, 255, 0.1)",
        }}
      >
        <Ionicons
          name={exercise.icon === "barbell" ? "barbell-outline" : "fitness-outline"}
          size={80}
          color="cyan"
          style={{ alignSelf: "center", marginTop: 85 }}
        />
      </View>

      <Text
        style={{
          color: "white",
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        {exercise.name}
      </Text>
      <Text
        style={{
          color: "#aaa",
          fontSize: 16,
          lineHeight: 24,
          marginBottom: 20,
        }}
      >
        {exercise.instructions}
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "cyan",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {exercise.sets}
          </Text>
          <Text
            style={{
              color: "#aaa",
              fontSize: 14,
            }}
          >
            Sets
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "cyan",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {exercise.reps}
          </Text>
          <Text
            style={{
              color: "#aaa",
              fontSize: 14,
            }}
          >
            Reps
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "cyan",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {exercise.rest}
          </Text>
          <Text
            style={{
              color: "#aaa",
              fontSize: 14,
            }}
          >
            Rest
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "cyan",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text style={styles.buttonText}>Start Exercise</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

// Home Tab Screen with new workout UI and functional PR goals
const HomeTabScreen = ({ navigation, route }) => {
  const [userName, setUserName] = useState("User")
  const [userGoal, setUserGoal] = useState("strength") // This would come from user preferences
  const [userSplit, setUserSplit] = useState(route.params?.updatedSplit || "full_body") // Default split
  const [prGoals, setPrGoals] = useState([
    { id: 1, exercise: "Bench Press", current: 185, target: 225, unit: "lbs" },
    { id: 2, exercise: "Squat", current: 275, target: 315, unit: "lbs" },
    { id: 3, exercise: "Deadlift", current: 315, target: 405, unit: "lbs" },
  ])
  const [showMaxModal, setShowMaxModal] = useState(false)
  const [showAllPRs, setShowAllPRs] = useState(false)

  const currentDate = new Date()
  const formattedDate = `${currentDate.toLocaleString("default", { weekday: "long" })}, ${currentDate.getDate()} ${currentDate.toLocaleString("default", { month: "long" })}`

  // Get next workout based on user's split
  const getNextWorkout = () => {
    const day = currentDate.getDay() // 0-6, starting with Sunday

    // Get workouts based on user's fitness goal
    const goalWorkouts =
      userGoal === "powerlifting"
        ? workoutData.powerlifting
        : userGoal === "athleticism"
          ? workoutData.athletic
          : userGoal === "weightloss"
            ? workoutData.weightloss
            : userGoal === "muscle"
              ? workoutData.muscle
              : workoutData.strength

    switch (userSplit) {
      case "ppl": {
        // Push/Pull/Legs split
        const pplDay = day % 3
        if (pplDay === 0) return { title: "Push Day", workout: goalWorkouts.workouts[0] }
        if (pplDay === 1) return { title: "Pull Day", workout: workoutData.muscle.workouts[0] }
        return { title: "Leg Day", workout: workoutData.muscle.workouts[1] }
      }
      case "upper_lower": {
        // Upper/Lower split
        return day % 2 === 0
          ? { title: "Upper Body", workout: goalWorkouts.workouts[0] }
          : { title: "Lower Body", workout: goalWorkouts.workouts[1] || workoutData.strength.workouts[1] }
      }
      case "bro": {
        // Bro split - each day a different muscle group
        const broSplits = [
          { title: "Chest Day", workout: workoutData.muscle.workouts[0] },
          { title: "Back Day", workout: workoutData.muscle.workouts[0] },
          { title: "Shoulder Day", workout: goalWorkouts.workouts[0] },
          { title: "Arm Day", workout: goalWorkouts.workouts[0] },
          { title: "Leg Day", workout: workoutData.muscle.workouts[1] },
        ]
        return broSplits[day % 5]
      }
      case "arnold": {
        // Arnold split
        if (day % 3 === 0) return { title: "Chest & Back", workout: workoutData.muscle.workouts[0] }
        if (day % 3 === 1) return { title: "Shoulders & Arms", workout: goalWorkouts.workouts[0] }
        return { title: "Leg Day", workout: workoutData.muscle.workouts[1] }
      }
      case "full_body":
      default:
        // Full body by default
        return { title: "Full Body Workout", workout: goalWorkouts.workouts[0] }
    }
  }

  const nextWorkout = getNextWorkout()

  // Handle adding a new PR goal
  const handleAddPRGoal = (newGoal) => {
    setPrGoals((prev) => [...prev, newGoal])
  }

  // Recent plans with navigation
  const recentPlans = [
    { id: 1, name: "Special", icon: "star", workout: workoutData.health.workouts[0] },
    { id: 2, name: "Beach Ready", icon: "sunny", workout: workoutData.muscle.workouts[0] },
    { id: 3, name: "Full-Body", icon: "body", workout: workoutData.strength.workouts[0] },
    { id: 4, name: "Challenge", icon: "trophy", workout: workoutData.athleticism.workouts[0] },
  ]

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "black" }}>
      <View style={styles.homeHeader}>
        <View style={styles.headerLeft}>
          <View style={styles.profilePic}>
            <Ionicons name="person" size={30} color="cyan" />
          </View>
          <View>
            <Text style={styles.greeting}>Hello {userName}!</Text>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.headerRight}>
          <Ionicons name="calendar-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>My Plan</Text>

      <View style={{ alignItems: "center" }}>
        <View style={styles.workoutCard}>
          <Text style={styles.workoutWeek}>WEEK 1</Text>
          <Text style={styles.workoutTitle}>{nextWorkout.title}</Text>
          <Text style={styles.workoutProgress}>Based on your {getSplitName(userSplit)} split</Text>

          <TouchableOpacity
            style={styles.nextExercise}
            onPress={() => navigation.navigate("WorkoutDetail", { workout: nextWorkout.workout })}
          >
            <View>
              <Text style={styles.nextExerciseText}>Next workout</Text>
              <Text style={styles.nextExerciseTitle}>{nextWorkout.workout.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.prGoalsSection}>
        <View style={styles.recentHeader}>
          <Text style={styles.sectionTitle}>PR Goals</Text>
          <TouchableOpacity onPress={() => setShowAllPRs(!showAllPRs)}>
            <Text style={styles.seeAll}>{showAllPRs ? "See Less" : "See All"}</Text>
          </TouchableOpacity>
        </View>

        {prGoals.slice(0, showAllPRs ? prGoals.length : 3).map((goal) => {
          const progressPercent = (goal.current / goal.target) * 100
          return (
            <View key={goal.id} style={styles.prGoalCard}>
              <View style={styles.prGoalHeader}>
                <Text style={styles.prGoalTitle}>{goal.exercise}</Text>
                <Text style={styles.prGoalValue}>
                  {goal.current} <Text style={{ fontSize: 16 }}>{goal.unit}</Text>
                </Text>
              </View>
              <Text style={styles.prGoalTarget}>
                Target: {goal.target} {goal.unit}
              </Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
              </View>
            </View>
          )
        })}

        <TouchableOpacity style={styles.button} onPress={() => setShowMaxModal(true)}>
          <Text style={styles.buttonText}>Add New PR Goal</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.recentPlans}>
        <View style={styles.recentHeader}>
          <Text style={styles.sectionTitle}>Recent Plans</Text>
          <TouchableOpacity onPress={() => navigation.navigate("AllWorkouts")}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.plansList}>
          {recentPlans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={styles.planItem}
              onPress={() => navigation.navigate("WorkoutDetail", { workout: plan.workout })}
            >
              <View style={styles.planIcon}>
                <Ionicons name={plan.icon} size={24} color="cyan" />
              </View>
              <Text style={styles.planName}>{plan.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* PR Goal Input Modal */}
      <MaxInputModal visible={showMaxModal} onClose={() => setShowMaxModal(false)} onSave={handleAddPRGoal} />
    </ScrollView>
  )
}

// Mental Tab Screen with guided sessions
const MentalTabScreen = () => {
  const [guideVisible, setGuideVisible] = useState(false)
  const [sessionType, setSessionType] = useState(null)

  const handleStartSession = (type) => {
    setSessionType(type)
    setGuideVisible(true)
  }

  return (
    <View style={styles.tabContent}>
      <View style={{ width: "100%", alignItems: "center", paddingTop: 30 }}>
        <Text style={styles.title}>Mental Wellness</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daily Meditation</Text>
          <Text style={styles.cardText}>10-minute guided meditation for focus</Text>
          <TouchableOpacity style={[styles.button, { marginTop: 15 }]} onPress={() => handleStartSession("meditation")}>
            <Text style={styles.buttonText}>Start Session</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Stress Management</Text>
          <Text style={styles.cardText}>Breathing exercises and relaxation techniques</Text>
          <TouchableOpacity style={[styles.button, { marginTop: 15 }]} onPress={() => handleStartSession("stress")}>
            <Text style={styles.buttonText}>Start Session</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sleep Improvement</Text>
          <Text style={styles.cardText}>Techniques to help you fall asleep faster and improve sleep quality</Text>
          <TouchableOpacity style={[styles.button, { marginTop: 15 }]} onPress={() => handleStartSession("sleep")}>
            <Text style={styles.buttonText}>Start Session</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Mental Workout Guide */}
      <MentalWorkoutGuide visible={guideVisible} onClose={() => setGuideVisible(false)} sessionType={sessionType} />
    </View>
  )
}

// Workout Progress Screen updated for cardio focus
const WorkoutProgressScreen = ({ route, navigation }) => {
  const { workout } = route.params
  const [selectedCardio, setSelectedCardio] = useState(null)
  const [participantCount, setParticipantCount] = useState(10)
  const [joinedWorkout, setJoinedWorkout] = useState(false)
  const [countdown, setCountdown] = useState(5)

  // Get current date and time
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, "0")
  const minutes = now.getMinutes().toString().padStart(2, "0")
  const currentTimeString = `${hours}:${minutes}`

  // Cardio options
  const cardioOptions = [
    { id: 1, name: "HIIT Cardio", icon: "flame", duration: "20 min", distance: "3.2 km", calories: "280 kcal" },
    { id: 2, name: "Steady State", icon: "bicycle", duration: "30 min", distance: "6.5 km", calories: "320 kcal" },
    { id: 3, name: "Interval Run", icon: "walk", duration: "25 min", distance: "4.8 km", calories: "310 kcal" },
  ]

  // Handle joining workout
  const handleJoinWorkout = () => {
    if (selectedCardio) {
      setJoinedWorkout(true)
      // Start countdown
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      Alert.alert("Select Workout", "Please select a cardio workout type first")
    }
  }

  return (
    <View style={styles.workoutProgressContainer}>
      <View style={styles.progressHeader}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Group Cardio
        </Text>
        <TouchableOpacity style={styles.optionsButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {joinedWorkout ? (
        <View style={styles.timerContainer}>
          <Text style={styles.timerLabel}>Group Workout Starting</Text>
          {countdown > 0 ? (
            <>
              <Text style={styles.timer}>{countdown}</Text>
              <Text style={{ color: "cyan", fontSize: 18 }}>Get Ready!</Text>
            </>
          ) : (
            <>
              <Text style={styles.timer}>GO!</Text>
              <Text style={{ color: "cyan", fontSize: 18 }}>
                {selectedCardio.name} - {selectedCardio.duration}
              </Text>
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={{ alignItems: "center", marginHorizontal: 20 }}>
                  <Text style={{ color: "white", fontSize: 24 }}>{selectedCardio.distance}</Text>
                  <Text style={{ color: "#aaa", fontSize: 14 }}>Distance</Text>
                </View>
                <View style={{ alignItems: "center", marginHorizontal: 20 }}>
                  <Text style={{ color: "white", fontSize: 24 }}>{selectedCardio.calories}</Text>
                  <Text style={{ color: "#aaa", fontSize: 14 }}>Calories</Text>
                </View>
                <View style={{ alignItems: "center", marginHorizontal: 20 }}>
                  <Text style={{ color: "white", fontSize: 24 }}>{"00:00"}</Text>
                  <Text style={{ color: "#aaa", fontSize: 14 }}>Elapsed</Text>
                </View>
              </View>
            </>
          )}

          <View style={styles.participantsContainer}>
            <View style={[styles.participant, { backgroundColor: "#FF5757" }]} />
            <View style={[styles.participant, { backgroundColor: "#FFBD59" }]} />
            <View style={[styles.participant, { backgroundColor: "#4F8EF7" }]} />
            <View style={[styles.participant, { backgroundColor: "#7ED957" }]} />
            <View style={styles.participantCount}>
              <Text style={styles.participantCountText}>{participantCount}</Text>
            </View>
          </View>

          <Text style={styles.participantsText}>{participantCount} People In This Workout</Text>

          <TouchableOpacity
            style={[styles.button, { marginTop: 20, backgroundColor: "#ff3b30" }]}
            onPress={() => {
              setJoinedWorkout(false)
              setCountdown(5)
            }}
          >
            <Text style={styles.buttonText}>Leave Workout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.timerContainer}>
            <Text style={styles.timerLabel}>Current Time</Text>
            <Text style={styles.timer}>{currentTimeString}</Text>

            <View style={styles.participantsContainer}>
              <View style={[styles.participant, { backgroundColor: "#FF5757" }]} />
              <View style={[styles.participant, { backgroundColor: "#FFBD59" }]} />
              <View style={[styles.participant, { backgroundColor: "#4F8EF7" }]} />
              <View style={[styles.participant, { backgroundColor: "#7ED957" }]} />
              <View style={styles.participantCount}>
                <Text style={styles.participantCountText}>{participantCount}</Text>
              </View>
            </View>

            <Text style={styles.participantsText}>{participantCount} People Plan to Workout</Text>
          </View>

          <View style={styles.dateSelector}>
            <View style={styles.dateItem}>
              <Text style={styles.dateValue}>5</Text>
            </View>
            <View style={styles.dateItem}>
              <Text style={styles.dateValue}>6</Text>
            </View>
            <View style={styles.dateItem}>
              <Text style={styles.dateValue}>7</Text>
            </View>
            <View style={[styles.dateItem, styles.activeDateItem]}>
              <Text style={[styles.dateValue, styles.activeDateValue]}>Today</Text>
            </View>
            <View style={styles.dateItem}>
              <Text style={styles.dateValue}>9</Text>
            </View>
            <View style={styles.dateItem}>
              <Text style={styles.dateValue}>10</Text>
            </View>
            <View style={styles.dateItem}>
              <Text style={styles.dateValue}>11</Text>
            </View>
          </View>

          <View>
            <Text style={[styles.sectionTitle, { marginLeft: 0, marginBottom: 15 }]}>Cardio Workouts</Text>

            {cardioOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.workoutOption,
                  selectedCardio?.id === option.id
                    ? {
                        borderWidth: 2,
                        borderColor: "cyan",
                        backgroundColor: "rgba(0, 255, 255, 0.1)",
                      }
                    : {},
                ]}
                onPress={() => setSelectedCardio(option)}
              >
                <View style={styles.workoutOptionIcon}>
                  <Ionicons name={option.icon} size={24} color="white" />
                </View>
                <View style={styles.workoutOptionDetails}>
                  <Text style={styles.workoutOptionTitle}>{option.name}</Text>
                  <Text style={styles.workoutOptionDuration}>{option.duration}</Text>
                </View>
                <View style={styles.workoutOptionStats}>
                  <Text style={styles.workoutOptionDistance}>{option.distance}</Text>
                  <Text style={styles.workoutOptionCalories}>{option.calories}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={handleJoinWorkout}>
            <Text style={styles.buttonText}>Join Group Workout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

// All Workouts Screen
const AllWorkoutsScreen = ({ navigation }) => {
  const allWorkouts = [
    ...workoutData.strength.workouts,
    ...workoutData.muscle.workouts,
    ...workoutData.health.workouts,
    ...workoutData.athleticism.workouts,
  ]

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "black" }}>
      <View style={{ paddingTop: 50, paddingBottom: 20, alignItems: "center" }}>
        <Text style={styles.title}>All Workouts</Text>
      </View>

      {allWorkouts.map((workout, index) => (
        <TouchableOpacity
          key={`workout-${index}`}
          style={[styles.card, { marginHorizontal: 20, marginBottom: 15 }]}
          onPress={() => navigation.navigate("WorkoutDetail", { workout })}
        >
          <Text style={styles.cardTitle}>{workout.title}</Text>
          <Text style={styles.cardText}>{workout.description}</Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View
              style={{
                backgroundColor: "rgba(0, 255, 255, 0.2)",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
                marginRight: 10,
              }}
            >
              <Text style={{ color: "cyan" }}>{workout.difficulty}</Text>
            </View>
            <View
              style={{
                backgroundColor: "rgba(0, 255, 255, 0.2)",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "cyan" }}>{workout.duration}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

// Update the WorkoutSplitScreen to change the user's workout split
const WorkoutSplitScreen = ({ navigation, route }) => {
  const [selectedSplit, setSelectedSplit] = useState(route.params?.currentSplit || "full_body")
  const [loading, setLoading] = useState(false)

  const splits = [
    { id: "ppl", name: "Push/Pull/Legs" },
    { id: "upper_lower", name: "Upper/Lower" },
    { id: "full_body", name: "Full Body" },
    { id: "bro", name: "Bro Split" },
    { id: "arnold", name: "Arnold Split" },
    { id: "custom", name: "Custom Split" },
  ]

  const applySplit = () => {
    if (!selectedSplit) {
      Alert.alert("Please select a split")
      return
    }

    setLoading(true)

    // Mock saving the selected split
    setTimeout(() => {
      setLoading(false)

      // Navigate back and pass the selected split
      navigation.navigate("HomeTabs", { screen: "Home", params: { updatedSplit: selectedSplit } })

      // Show confirmation
      Alert.alert(
        "Split Selected",
        `You've selected the ${splits.find((s) => s.id === selectedSplit).name} split. Your workout plan has been updated.`,
      )
    }, 1500)
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "black" }}>
      <View style={{ paddingTop: 50, paddingBottom: 20, alignItems: "center" }}>
        <Text style={styles.title}>Choose Your Split</Text>
        <Text style={styles.subtitle}>Select a workout split that fits your schedule and goals</Text>
      </View>

      <View style={styles.splitSelector}>
        {splits.map((split) => (
          <TouchableOpacity
            key={split.id}
            style={[
              styles.splitOption,
              selectedSplit === split.id ? styles.splitOptionSelected : styles.splitOptionUnselected,
            ]}
            onPress={() => setSelectedSplit(split.id)}
          >
            <Text style={styles.splitTitle}>{split.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedSplit && (
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.sectionTitle}>Split Details</Text>

          {selectedSplit === "ppl" && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Push/Pull/Legs</Text>
              <Text style={styles.cardText}>
                A 6-day split focusing on pushing movements (chest, shoulders, triceps), pulling movements (back,
                biceps), and legs.
              </Text>
              <View style={{ marginTop: 15 }}>
                <Text style={{ color: "cyan", marginBottom: 5 }}>Day 1: Push</Text>
                <Text style={{ color: "cyan", marginBottom: 5 }}>Day 2: Pull</Text>
                <Text style={{ color: "cyan", marginBottom: 5 }}>Day 3: Legs</Text>
                <Text style={{ color: "cyan", marginBottom: 5 }}>Day 4: Push</Text>
                <Text style={{ color: "cyan", marginBottom: 5 }}>Day 5: Pull</Text>
                <Text style={{ color: "cyan" }}>Day 6: Legs</Text>
                <Text style={{ color: "cyan" }}>Day 7: Rest</Text>
              </View>
            </View>
          )}

          {selectedSplit === "upper_lower" && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Upper/Lower</Text>
              <Text style={styles.cardText}>A 4-day split alternating between upper body and lower body workouts.</Text>
              <View style={{ marginTop: 15 }}>
                <Text style={{ color: "cyan", marginBottom: 5 }}>Day 1: Upper</Text>
                <Text style={{ color: "cyan", marginBottom: 5 }}>Day 2: Lower</Text>
                <Text style={{ color: "cyan", marginBottom: 5 }}>Day 3: Rest</Text>
                <Text style={{ color: "cyan", marginBottom: 5 }}>Day 4: Upper</Text>
                <Text style={{ color: "cyan", marginBottom: 5 }}>Day 5: Lower</Text>
                <Text style={{ color: "cyan" }}>Day 6-7: Rest</Text>
              </View>
            </View>
          )}

          {selectedSplit === "full_body" && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Full Body</Text>
              <Text style={styles.cardText}>A 3-day split working all major muscle groups in each session.</Text>
              <View style={{ marginTop: 15 }}>
                <Text style={{ color: "cyan", marginBottom: 5 }}>Day 1: Full Body</Text>
                <Text style={{ color: "cyan", marginBottom: 5 }}>Day 2: Rest</Text>
                <Text style={{ color: "cyan", marginBottom: 5 }}>Day 3: Full Body</Text>
                <Text style={{ color: "cyan", marginBottom: 5 }}>Day 4: Rest</Text>
                <Text style={{ color: "cyan", marginBottom: 5 }}>Day 5: Full Body</Text>
                <Text style={{ color: "cyan" }}>Day 6-7: Rest</Text>
              </View>
            </View>
          )}

          {selectedSplit === "bro" && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Bro Split</Text>
              <Text style={styles.cardText}>A 5-day split with each day focusing on a different muscle group.</Text>
              <View style={{ marginTop: 15 }}>
                <Text style={{ color: "cyan", marginBottom: 5 }}>Day 1: Chest</Text>
                <Text style={{ color: "cyan", marginBottom: 5 }}>Day 2: Back</Text>
                <Text style={{ color: "cyan", marginBottom: 5 }}>Day 3: Shoulders</Text>
                <Text style={{ color: "cyan", marginBottom: 5 }}>Day 4: Arms</Text>
                <Text style={{ color: "cyan", marginBottom: 5 }}>Day 5: Legs</Text>
                <Text style={{ color: "cyan" }}>Day 6-7: Rest</Text>
              </View>
            </View>
          )}

          {selectedSplit === "arnold" && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Arnold Split</Text>
              <Text style={styles.cardText}>A 6-day split inspired by Arnold Schwarzenegger's training routine.</Text>
              <View style={{ marginTop: 15 }}>
                <Text style={{ color: "cyan", marginBottom: 5 }}>Day 1: Chest & Back</Text>
                <Text style={{ color: "cyan", marginBottom: 5 }}>Day 2: Shoulders & Arms</Text>
                <Text style={{ color: "cyan", marginBottom: 5 }}>Day 3: Legs</Text>
                <Text style={{ color: "cyan", marginBottom: 5 }}>Day 4: Chest & Back</Text>
                <Text style={{ color: "cyan", marginBottom: 5 }}>Day 5: Shoulders & Arms</Text>
                <Text style={{ color: "cyan", marginBottom: 5 }}>Day 6: Legs</Text>
                <Text style={{ color: "cyan" }}>Day 7: Rest</Text>
              </View>
            </View>
          )}

          {selectedSplit === "custom" && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Custom Split</Text>
              <Text style={styles.cardText}>
                Create your own custom workout split based on your preferences and schedule.
              </Text>
              <TouchableOpacity style={[styles.button, { marginTop: 15 }]}>
                <Text style={styles.buttonText}>Create Custom Split</Text>
              </TouchableOpacity>
            </View>
          )}

          {selectedSplit && (
            <TouchableOpacity style={[styles.button, { marginBottom: 30 }]} onPress={applySplit}>
              <Text style={styles.buttonText}>Apply This Split</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <LoadingOverlay visible={loading} message="Updating your workout plan..." />
    </ScrollView>
  )
}

// Profile Screen
const ProfileScreen = () => {
  return (
    <View style={styles.tabContent}>
      <Text style={styles.title}>Profile Screen</Text>
      {/* Add profile content here */}
    </View>
  )
}

// Shop Screen
const ShopScreen = () => {
  return (
    <View style={styles.tabContent}>
      <Text style={styles.title}>Shop Screen</Text>
      {/* Add shop content here */}
    </View>
  )
}

// Home Tabs Navigator
const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          borderTopColor: "rgba(255, 255, 255, 0.1)",
          paddingTop: 5,
          height: 60,
        },
        tabBarActiveTintColor: "cyan",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Gym") {
            iconName = focused ? "barbell" : "barbell-outline"
          } else if (route.name === "Mental") {
            iconName = focused ? "brain" : "brain-outline"
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline"
          } else if (route.name === "Shop") {
            iconName = focused ? "cart" : "cart-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeTabScreen} />
      <Tab.Screen name="Gym" component={AllWorkoutsScreen} />
      <Tab.Screen name="Mental" component={MentalTabScreen} />
      <Tab.Screen name="Profile" component={ProfileScreenComponent} />
      <Tab.Screen name="Shop" component={ShopScreenComponent} />
    </Tab.Navigator>
  )
}

// Main App component with workout screens
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "black" },
        }}
      >
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="GetToKnow" component={GetToKnowScreen} />
        <Stack.Screen name="GymQuestion" component={GymQuestionScreen} />
        <Stack.Screen name="GoalsScreen" component={GoalsScreen} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} />
        <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} />
        <Stack.Screen name="WorkoutProgress" component={WorkoutProgressScreen} />
        <Stack.Screen name="WorkoutSplit" component={WorkoutSplitScreen} />
        <Stack.Screen name="AllWorkouts" component={AllWorkoutsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

