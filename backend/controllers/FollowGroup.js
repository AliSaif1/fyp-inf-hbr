

import jwt from 'jsonwebtoken';
import User from '../models/user.js'; // User model
import Group from '../models/Group.js'; // Group model

export const toggleFollowGroup = async (req, res) => {
    const { groupId } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      // eslint-disable-next-line no-undef
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
  
      let isFollowing = false;
  
      // Toggle Follow/Unfollow
      if (user.followedGroups.includes(groupId)) {
        user.followedGroups = user.followedGroups.filter((id) => id.toString() !== groupId);
        group.followedBy = group.followedBy.filter((id) => id.toString() !== user._id.toString());
      } else {
        user.followedGroups.push(groupId);
        group.followedBy.push(user._id);
        isFollowing = true;
      }
  
      await user.save();
      await group.save();
  
      return res.status(200).json({
        message: isFollowing ? 'Followed the group successfully' : 'Unfollowed the group successfully',
        groupId,
        isFollowing,
      });
    } catch (error) {
      console.error('Error toggling follow status:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  

  export const checkFollowStatus = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      // eslint-disable-next-line no-undef
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).populate('followedGroups');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const followedGroups = user.followedGroups.map((group) => ({
        _id: group._id,
        title: group.title,
        isFollowing: true, // Status is always true for followed groups
      }));
  
      return res.status(200).json(followedGroups);
    } catch (error) {
      console.error('Error fetching follow status:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  








  export const unfollowGroup = async (req, res) => {
    const { groupId } = req.body; // Get groupId from request body
    
    const token = req.headers.authorization?.split(' ')[1]; // Extract token
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      // Verify token and extract user ID
      // eslint-disable-next-line no-undef
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find the group to ensure it exists
      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
  
      // Remove the groupId from the user's followedGroups list
      user.followedGroups = user.followedGroups.filter(
        (id) => id.toString() !== groupId
      );
  
      // Remove the user's ID from the group's followedBy list
      group.followedBy = group.followedBy.filter(
        (id) => id.toString() !== user._id.toString()
      );
  
      // Save the updated user and group records
      await user.save();
      await group.save();
  
      return res.status(200).json({
        message: 'Successfully unfollowed the group.',
        groupId,
      });
    } catch (error) {
      console.error('Error unfollowing the group:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  
















// // import jwt from 'jsonwebtoken';
// // import User from '../models/user.js'; // User model
// // import Group from '../models/Group.js'; // Group model

// // // Toggle Follow Status for a Group
// // export const toggleFollowGroup = async (req, res) => {
// //     const { groupId } = req.body;
// //     const token = req.headers.authorization?.split(' ')[1]; // Get token from header
  
// //     if (!token) {
// //       return res.status(401).json({ message: 'Unauthorized' });
// //     }
  
// //     try {
// //       // Verify and decode the token
// //       const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //       const user = await User.findById(decoded.id); // Find user by the decoded id
  
// //       if (!user) {
// //         return res.status(404).json({ message: 'User not found' });
// //       }
  
// //       let message;
// //       if (user.followedGroups.includes(groupId)) {
// //         // Unfollow group
// //         user.followedGroups = user.followedGroups.filter(
// //           (group) => group.toString() !== groupId
// //         );
// //         message = 'Unfollowed the group successfully';
  
// //         // Optionally update the group's followers
// //         const group = await Group.findById(groupId);
// //         if (group) {
// //           group.followedBy = group.followedBy.filter(
// //             (follower) => follower.toString() !== user._id.toString()
// //           );
// //           await group.save();
// //         }
// //       } else {
// //         // Follow group
// //         console.log("hi",user.followedGroups);
// //         // user.followedGroups.push(groupId);
// //         message = 'Followed the group successfully';
  
// //         // Optionally update the group's followers
// //         const group = await Group.findById(groupId);
// //         console.log("HI2",group);
// //         if (group) {
// //             if (!Array.isArray(group.followedBy)) {
// //                 group.followedBy = [];
// //               }
        
// //           group.followedBy.push(group._id);
// //           await group.save();
// //         }
// //       }
  
// //       await user.save();
// //       return res.status(200).json({ message, followedGroups: user.followedGroups });
// //     } catch (error) {
// //       console.error('Error toggling follow status:', error);
// //       return res.status(500).json({ message: 'Server error' });
// //     }
// //   };
  
  

// // export const checkFollowStatus = async (req, res) => {
// //     const token = req.headers.authorization?.split(' ')[1]; // Get token from header
    
// //     if (!token) {
// //       return res.status(401).json({ message: 'Unauthorized' });
// //     }
  
// //     try {
// //       // Verify token and get the user
// //       const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //       const user = await User.findById(decoded.id).populate('followedGroups');  // Populate followedGroups with actual group data
  
// //       if (!user) {
// //         return res.status(404).json({ message: 'User not found' });
// //       }
  
// //       // Return the user's followed groups
// //       return res.status(200).json(user.followedGroups); // Return populated groups
// //     } catch (error) {
// //       console.error('Error fetching followed groups:', error);
// //       return res.status(500).json({ message: 'Server error' });
// //     }
// //   };







// import jwt from 'jsonwebtoken';
// import User from '../models/user.js';
// import Group from '../models/Group.js';

// export const toggleFollowGroup = async (req, res) => {
//   const { groupId } = req.body;
//   const token = req.headers.authorization?.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const group = await Group.findById(groupId);
//     if (!group) {
//       return res.status(404).json({ message: 'Group not found' });
//     }

//     let message;
//     if (user.followedGroups.includes(groupId)) {
//       // Unfollow group
//       user.followedGroups = user.followedGroups.filter((id) => id.toString() !== groupId);
//       group.followedBy = group.followedBy.filter((id) => id.toString() !== user._id.toString());
//       message = 'Unfollowed the group successfully';
//     } else {
//       // Follow group
//       user.followedGroups.push(groupId);
//       group.followedBy.push(user._id);
//       message = 'Followed the group successfully';
//     }

//     await user.save();
//     await group.save();

//     return res.status(200).json({ message, followedGroups: user.followedGroups });
//   } catch (error) {
//     console.error('Error toggling follow status:', error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };


// export const checkFollowStatus = async (req, res) => {
//     const token = req.headers.authorization?.split(' ')[1];
//     const { groupId } = req.query; // Optional: Check for a specific group
  
//     if (!token) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
  
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const user = await User.findById(decoded.id).populate('followedGroups');
  
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       if (groupId) {
//         const isFollowing = user.followedGroups.some((group) => group._id.toString() === groupId);
//         return res.status(200).json({ isFollowing });
//       }
  
//       return res.status(200).json({ followedGroups: user.followedGroups });
//     } catch (error) {
//       console.error('Error fetching follow status:', error);
//       return res.status(500).json({ message: 'Server error' });
//     }
//   };
  

