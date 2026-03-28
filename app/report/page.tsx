"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Upload, MapPin, Loader2, CheckCircle, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassComponents";
import { issueService, suggestCategory } from "@/services/issueService";
import { IssueCategory } from "@/types";
import { ISSUE_CATEGORIES } from "@/constants";
import { useRouter } from "next/navigation";

const issueSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(30, "Description must be at least 30 characters"),
  category: z.enum(["roads", "water", "electricity", "sanitation", "safety", "others"]),
  address: z.string().min(5, "Address is required"),
  lat: z.number(),
  lng: z.number(),
});

type IssueFormData = z.infer<typeof issueSchema>;

export default function ReportPage() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [suggestedCategory, setSuggestedCategory] = useState<IssueCategory | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      category: "others",
      lat: 40.7128,
      lng: -74.006,
    },
  });

  const description = watch("description");

  // Auto-suggest category based on description
  useEffect(() => {
    if (description && description.length > 20) {
      const suggested = suggestCategory(description);
      if (suggested !== "others") {
        setSuggestedCategory(suggested);
      }
    } else {
      setSuggestedCategory(null);
    }
  }, [description]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setValue("lat", position.coords.latitude);
          setValue("lng", position.coords.longitude);
          setValue("address", `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
          setLocationLoading(false);
        },
        () => {
          alert("Unable to retrieve location");
          setLocationLoading(false);
        }
      );
    }
  };

  const onSubmit = async (data: IssueFormData) => {
    setIsSubmitting(true);
    try {
      await issueService.createIssue({
        title: data.title,
        description: data.description,
        category: data.category,
        status: "pending",
        location: {
          lat: data.lat,
          lng: data.lng,
          address: data.address,
        },
        imageUrl: imagePreview || undefined,
        userId: "current-user",
        userName: "Demo User",
      });

      setShowSuccess(true);
      setTimeout(() => {
        router.push("/issues");
      }, 2000);
    } catch (error) {
      console.error("Error submitting issue:", error);
      alert("Failed to submit issue. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Issue Reported Successfully!
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Redirecting to issues page...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Report an Issue
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Help improve your community by reporting civic problems
          </p>
        </motion.div>

        <GlassCard>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Issue Title *
              </label>
              <input
                {...register("title")}
                type="text"
                placeholder="e.g., Large pothole on Main Street"
                className="w-full px-4 py-3 rounded-xl glass border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                {...register("description")}
                rows={5}
                placeholder="Provide detailed information about the issue..."
                className="w-full px-4 py-3 rounded-xl glass border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}

              {suggestedCategory && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-blue-700 dark:text-blue-300">
                    Suggested category: <strong>{ISSUE_CATEGORIES[suggestedCategory].label}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setValue("category", suggestedCategory)}
                    className="ml-auto text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Apply
                  </button>
                </motion.div>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                {...register("category")}
                className="w-full px-4 py-3 rounded-xl glass border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {Object.entries(ISSUE_CATEGORIES).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upload Image (Optional)
              </label>
              <div className="glass rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mb-2" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Click to upload an image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location *
              </label>
              <div className="flex gap-3">
                <input
                  {...register("address")}
                  type="text"
                  placeholder="Enter address or use GPS"
                  className="flex-1 px-4 py-3 rounded-xl glass border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  type="button"
                  onClick={getLocation}
                  disabled={locationLoading}
                  className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  {locationLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <MapPin className="w-5 h-5" />
                  )}
                  <span className="hidden sm:inline">Use GPS</span>
                </button>
              </div>
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Issue"
              )}
            </motion.button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}
