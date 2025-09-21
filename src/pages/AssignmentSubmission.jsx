import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/Card';
import { Button } from '../components/Button';

export const AssignmentSubmission = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold text-gray-900">Assignment Submission</h1>
          <p className="text-gray-600">Assignment ID: {id}</p>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Assignment submission functionality will be implemented here.</p>
          <Button className="mt-4">Submit Assignment</Button>
        </CardContent>
      </Card>
    </div>
  );
};
