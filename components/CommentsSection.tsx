"use client";

import { useState } from "react";

interface Comment {
  id: string;
  author: string;
  authorAvatar?: string;
  text: string;
  timestamp: string;
  rating?: number;
}

interface CommentsSectionProps {
  comments: Comment[];
}

export default function CommentsSection({ comments: initialComments }: CommentsSectionProps) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: "You",
      text: newComment,
      timestamp: "Just now",
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 rounded-2xl p-6 sm:p-8 border border-white/20 dark:border-white/10 shadow-xl">
      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Comments ({comments.length})
      </h3>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
            Y
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your experience..."
              className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-white/20 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
              rows={3}
            />
            <button
              type="submit"
              className="mt-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Post Comment
            </button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-slate-600 dark:text-slate-400 text-center py-8">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                {comment.author.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {comment.author}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {comment.timestamp}
                  </p>
                </div>
                <p className="text-slate-700 dark:text-slate-300">{comment.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

