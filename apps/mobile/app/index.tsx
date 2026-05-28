// Demo screen — Week 1 sanity check. Renders every component in the
// design system across its variants so we can eyeball the system in both
// themes. Will be moved to a hidden /dev route in Week 2.

import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../src/theme/useTheme';
import { useThemeContext } from '../src/theme/ThemeProvider';
import { Avatar, Button, Card, Chip, TextInput } from '../src/components';

const CATEGORIES = ['Tiffin', 'Snacks', 'Pickle', 'Bakery', 'Sweets', 'Handmade'];

export default function DemoScreen() {
  const theme = useTheme();
  const { mode, cycleMode } = useThemeContext();
  const [selected, setSelected] = useState<Set<string>>(new Set(['Tiffin']));
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [pwError, setPwError] = useState<string | undefined>(undefined);

  function toggle(cat: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }} edges={['top']}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.lg,
          paddingBottom: theme.spacing['4xl'],
        }}
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: theme.spacing.lg }]}>
          <View>
            <Text style={[theme.type.caption, { color: theme.colors.textTertiary, marginBottom: 4 }]}>
              NEARFOLD · WEEK 1
            </Text>
            <Text style={[theme.type.h1, { color: theme.colors.text }]}>
              Design system, breathing.
            </Text>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Theme: ${mode}. Tap to cycle.`}
            onPress={cycleMode}
            style={[
              styles.themeChip,
              {
                borderColor: theme.colors.borderStrong,
                backgroundColor: theme.colors.surface,
              },
            ]}
          >
            <Text style={[theme.type.mono, { color: theme.colors.text }]}>
              {mode}
            </Text>
          </Pressable>
        </View>

        <Text
          style={[
            theme.type.bodyLg,
            { color: theme.colors.textSecondary, marginTop: theme.spacing.sm },
          ]}
        >
          Five primitives, both palettes. Tap the chip to cycle theme.
        </Text>

        {/* Buttons */}
        <Section title="Button">
          <View style={{ gap: theme.spacing.sm }}>
            <Button label="Order tiffin" variant="primary" onPress={() => {}} />
            <Button label="Save for later" variant="secondary" onPress={() => {}} />
            <Button label="Skip" variant="ghost" onPress={() => {}} />
            <Button label="Delete listing" variant="destructive" onPress={() => {}} />
            <View style={{ flexDirection: 'row', gap: theme.spacing.sm, flexWrap: 'wrap' }}>
              <Button label="Small" size="sm" onPress={() => {}} />
              <Button label="Medium" size="md" onPress={() => {}} />
              <Button label="Large" size="lg" onPress={() => {}} />
            </View>
            <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
              <Button label="Loading" loading onPress={() => {}} />
              <Button label="Disabled" disabled onPress={() => {}} />
            </View>
          </View>
        </Section>

        {/* TextInput */}
        <Section title="TextInput">
          <View style={{ gap: theme.spacing.md }}>
            <TextInput
              label="Your name"
              placeholder="Sneha"
              value={name}
              onChangeText={setName}
              helper="As it appears on your delivery."
            />
            <TextInput
              label="Password"
              placeholder="•••••••"
              value={password}
              onChangeText={(v) => {
                setPassword(v);
                setPwError(v.length > 0 && v.length < 6 ? 'Min 6 characters.' : undefined);
              }}
              passwordToggle
              error={pwError}
            />
          </View>
        </Section>

        {/* Card */}
        <Section title="Card">
          <View style={{ gap: theme.spacing.md }}>
            <Card variant="elevated">
              <Text style={[theme.type.h4, { color: theme.colors.text, marginBottom: 4 }]}>
                Aunty's evening tiffin
              </Text>
              <Text style={[theme.type.body, { color: theme.colors.textSecondary }]}>
                Roti, sabzi, dal, rice. Hot at 7pm. Five blocks away.
              </Text>
            </Card>
            <Card variant="outlined" onPress={() => {}}>
              <Text style={[theme.type.h4, { color: theme.colors.text, marginBottom: 4 }]}>
                Pressable outlined card
              </Text>
              <Text style={[theme.type.body, { color: theme.colors.textSecondary }]}>
                Light haptic on tap. Subtle scale animation.
              </Text>
            </Card>
            <Card variant="flat" padding="sm">
              <Text style={[theme.type.bodySm, { color: theme.colors.textSecondary }]}>
                Flat card — no shadow, muted surface. Use for metadata or asides.
              </Text>
            </Card>
          </View>
        </Section>

        {/* Chip */}
        <Section title="Chip">
          <View style={{ flexDirection: 'row', gap: theme.spacing.xs, flexWrap: 'wrap' }}>
            {CATEGORIES.map((c) => (
              <Chip
                key={c}
                label={c}
                selected={selected.has(c)}
                onPress={() => toggle(c)}
              />
            ))}
          </View>
          <View style={{ flexDirection: 'row', gap: theme.spacing.xs, marginTop: theme.spacing.md }}>
            <Chip label="Filter: Vegetarian" selected onRemove={() => {}} size="sm" />
            <Chip label="Filter: Under ₹200" onRemove={() => {}} size="sm" />
          </View>
        </Section>

        {/* Avatar */}
        <Section title="Avatar">
          <View style={{ flexDirection: 'row', gap: theme.spacing.md, alignItems: 'center' }}>
            <Avatar size="xs" name="Sneha Rao" />
            <Avatar size="sm" name="Priya M" status="online" />
            <Avatar size="md" name="Aman K" status="busy" />
            <Avatar size="lg" name="Lakshmi Devi" status="online" />
            <Avatar size="xl" name="Raj P" status="offline" />
          </View>
          <Text
            style={[
              theme.type.caption,
              { color: theme.colors.textTertiary, marginTop: theme.spacing.sm },
            ]}
          >
            Initials fallback when no image. Status dot scales with size.
          </Text>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const theme = useTheme();
  return (
    <View style={{ marginTop: theme.spacing['2xl'] }}>
      <Text
        style={[
          theme.type.labelSm,
          {
            color: theme.colors.textTertiary,
            textTransform: 'uppercase',
            marginBottom: theme.spacing.md,
          },
        ]}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  themeChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth * 2,
  },
});
