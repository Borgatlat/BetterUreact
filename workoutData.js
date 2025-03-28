// Expanded workout data with specialized programs
const workoutData = {
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
  powerlifting: {
    title: "Powerlifting",
    workouts: [
      {
        id: 1,
        title: "Powerlifting Upper Body",
        description: "Build maximal strength in chest, shoulders, and triceps",
        difficulty: "Hard",
        duration: "60 min",
        exercises: [
          {
            id: 1,
            name: "Pause Bench Press",
            icon: "barbell",
            sets: 5,
            reps: "3-5",
            rest: "3-4 min",
            instructions:
              "Lie on bench with feet flat on floor. Lower bar to chest, pause for 2 seconds, then press back up explosively. Use 80% of 1RM.",
          },
          {
            id: 2,
            name: "Close Grip Bench Press",
            icon: "barbell",
            sets: 4,
            reps: "4-6",
            rest: "2-3 min",
            instructions:
              "Lie on bench with hands shoulder-width apart. Lower bar to lower chest, then press back up. Focus on triceps engagement.",
          },
          {
            id: 3,
            name: "Overhead Press",
            icon: "barbell",
            sets: 5,
            reps: "3-5",
            rest: "3 min",
            instructions:
              "Stand with feet shoulder-width apart, bar at shoulder level. Press bar overhead until arms are fully extended. Lower with control.",
          },
          {
            id: 4,
            name: "Banded Dumbbell Bench Press",
            icon: "dumbbell",
            sets: 4,
            reps: "4-6",
            rest: "2-3 min",
            instructions:
              "Loop resistance band around back and hold ends with dumbbells. Perform bench press with added band resistance at top of movement.",
          },
          {
            id: 5,
            name: "Weighted Dips",
            icon: "bodyweight",
            sets: 4,
            reps: "4-6",
            rest: "2-3 min",
            instructions:
              "Add weight via belt or weighted vest. Lower body until upper arms are parallel to floor, then press back up.",
          },
        ],
      },
      {
        id: 2,
        title: "Powerlifting Lower Body",
        description: "Develop maximal strength in legs and posterior chain",
        difficulty: "Very Hard",
        duration: "70 min",
        exercises: [
          {
            id: 1,
            name: "Pause Back Squats",
            icon: "barbell",
            sets: 5,
            reps: "3-5",
            rest: "3-4 min",
            instructions:
              "Position barbell on upper back. Squat down until thighs are parallel to floor, pause for 2 seconds, then drive up. Use 80% of 1RM.",
          },
          {
            id: 2,
            name: "Front Squats",
            icon: "barbell",
            sets: 4,
            reps: "4-6",
            rest: "3 min",
            instructions:
              "Hold barbell across front of shoulders. Squat down while keeping torso upright, then return to standing.",
          },
          {
            id: 3,
            name: "Power Cleans",
            icon: "olympic",
            sets: 5,
            reps: "3-5",
            rest: "3 min",
            instructions:
              "Start with barbell on floor. Explosively pull bar up while extending hips, catch bar at shoulder level with slight knee bend.",
          },
          {
            id: 4,
            name: "Deficit Deadlifts",
            icon: "barbell",
            sets: 4,
            reps: "3-5",
            rest: "3-4 min",
            instructions:
              "Stand on 1-2 inch platform. Perform deadlift with increased range of motion due to deficit position.",
          },
          {
            id: 5,
            name: "Good Mornings",
            icon: "barbell",
            sets: 3,
            reps: "5-8",
            rest: "2-3 min",
            instructions:
              "Place barbell on upper back. Hinge at hips with slight knee bend, lowering torso toward floor while maintaining flat back. Return to upright position.",
          },
        ],
      },
    ],
  },
  athletic: {
    title: "Athletic Performance",
    workouts: [
      {
        id: 1,
        title: "Sport Performance Upper",
        description: "Develop functional strength and power for athletic movements",
        difficulty: "Hard",
        duration: "55 min",
        exercises: [
          {
            id: 1,
            name: "Bench Press",
            icon: "barbell",
            sets: 4,
            reps: "5-8",
            rest: "2-3 min",
            instructions:
              "Lie on bench with feet flat on floor. Lower bar to chest, then press explosively back up to starting position.",
          },
          {
            id: 2,
            name: "Banded Dumbbell Bench Press",
            icon: "dumbbell",
            sets: 3,
            reps: "6-8",
            rest: "2 min",
            instructions:
              "Loop resistance band around back and hold ends with dumbbells. Perform bench press with added band resistance at top of movement.",
          },
          {
            id: 3,
            name: "Pull-Ups",
            icon: "bodyweight",
            sets: 4,
            reps: "6-10",
            rest: "2 min",
            instructions:
              "Hang from bar with hands slightly wider than shoulder width. Pull body up until chin clears bar, then lower with control.",
          },
          {
            id: 4,
            name: "Medicine Ball Chest Pass",
            icon: "medicine-ball",
            sets: 3,
            reps: "8-10",
            rest: "90 sec",
            instructions:
              "Stand facing wall with medicine ball at chest. Explosively push ball into wall and catch on rebound.",
          },
          {
            id: 5,
            name: "Battle Ropes",
            icon: "cardio",
            sets: 4,
            reps: "30 sec",
            rest: "60 sec",
            instructions: "Hold one rope in each hand. Create waves by rapidly raising and lowering arms alternately.",
          },
        ],
      },
      {
        id: 2,
        title: "Sport Performance Lower",
        description: "Build explosive power and agility for athletic performance",
        difficulty: "Hard",
        duration: "60 min",
        exercises: [
          {
            id: 1,
            name: "Trap Bar Deadlifts",
            icon: "barbell",
            sets: 4,
            reps: "5-8",
            rest: "2-3 min",
            instructions:
              "Stand inside trap bar, grip handles. Drive through heels to stand up straight, then lower bar to floor with control.",
          },
          {
            id: 2,
            name: "Box Jumps",
            icon: "plyometric",
            sets: 4,
            reps: "6-8",
            rest: "2 min",
            instructions:
              "Stand facing box. Hinge at hips, swing arms, and jump explosively onto box. Step down and repeat.",
          },
          {
            id: 3,
            name: "Sled Pushes",
            icon: "sled",
            sets: 4,
            reps: "15m",
            rest: "2 min",
            instructions:
              "Grip sled handles at hip height. Drive forward with legs, maintaining low body position throughout push.",
          },
          {
            id: 4,
            name: "Lateral Bounds",
            icon: "plyometric",
            sets: 3,
            reps: "8 each side",
            rest: "90 sec",
            instructions:
              "Stand on one leg. Jump laterally as far as possible, land on opposite leg with control. Alternate sides.",
          },
          {
            id: 5,
            name: "Sprint Intervals",
            icon: "cardio",
            sets: 6,
            reps: "20 sec sprint, 40 sec walk",
            rest: "0 sec",
            instructions:
              "Sprint at maximum effort for 20 seconds, then walk for 40 seconds. Repeat for prescribed sets.",
          },
        ],
      },
    ],
  },
  weightloss: {
    title: "Weight Loss",
    workouts: [
      {
        id: 1,
        title: "Fat Burning Circuit",
        description: "High-intensity full body workout to maximize calorie burn",
        difficulty: "Medium",
        duration: "40 min",
        exercises: [
          {
            id: 1,
            name: "Kettlebell Swings",
            icon: "kettlebell",
            sets: 3,
            reps: "15-20",
            rest: "30 sec",
            instructions:
              "Stand with feet shoulder-width apart, kettlebell between feet. Hinge at hips, swing kettlebell between legs, then thrust hips forward to swing kettlebell to chest height.",
          },
          {
            id: 2,
            name: "Burpees",
            icon: "cardio",
            sets: 3,
            reps: "10-15",
            rest: "30 sec",
            instructions:
              "Start standing, drop to push-up position, perform push-up, jump feet toward hands, then jump up with hands overhead.",
          },
          {
            id: 3,
            name: "Mountain Climbers",
            icon: "cardio",
            sets: 3,
            reps: "45 sec",
            rest: "30 sec",
            instructions:
              "Start in push-up position. Rapidly alternate bringing knees toward chest, keeping hips level.",
          },
          {
            id: 4,
            name: "Dumbbell Thrusters",
            icon: "dumbbell",
            sets: 3,
            reps: "12-15",
            rest: "30 sec",
            instructions:
              "Hold dumbbells at shoulder height. Squat down, then as you stand, press dumbbells overhead in one fluid motion.",
          },
          {
            id: 5,
            name: "Jump Rope",
            icon: "cardio",
            sets: 3,
            reps: "60 sec",
            rest: "30 sec",
            instructions:
              "Jump rope at moderate to fast pace, staying on balls of feet and maintaining consistent rhythm.",
          },
        ],
      },
      {
        id: 2,
        title: "HIIT Cardio",
        description: "High-intensity interval training for maximum fat burning",
        difficulty: "Hard",
        duration: "30 min",
        exercises: [
          {
            id: 1,
            name: "Jumping Jacks",
            icon: "cardio",
            sets: 4,
            reps: "30 sec on, 15 sec off",
            rest: "30 sec between sets",
            instructions:
              "Stand with feet together, arms at sides. Jump feet out while raising arms overhead, then return to starting position.",
          },
          {
            id: 2,
            name: "High Knees",
            icon: "cardio",
            sets: 4,
            reps: "30 sec on, 15 sec off",
            rest: "30 sec between sets",
            instructions: "Run in place, lifting knees toward chest. Pump arms and stay on balls of feet.",
          },
          {
            id: 3,
            name: "Squat Jumps",
            icon: "plyometric",
            sets: 4,
            reps: "30 sec on, 15 sec off",
            rest: "30 sec between sets",
            instructions:
              "Lower into squat position, then explosively jump upward. Land softly and immediately lower into next rep.",
          },
          {
            id: 4,
            name: "Mountain Climbers",
            icon: "cardio",
            sets: 4,
            reps: "30 sec on, 15 sec off",
            rest: "30 sec between sets",
            instructions:
              "Start in push-up position. Rapidly alternate bringing knees toward chest, keeping hips level.",
          },
          {
            id: 5,
            name: "Burpees",
            icon: "cardio",
            sets: 4,
            reps: "30 sec on, 15 sec off",
            rest: "30 sec between sets",
            instructions:
              "Start standing, drop to push-up position, perform push-up, jump feet toward hands, then jump up with hands overhead.",
          },
        ],
      },
    ],
  },
}

export default workoutData

