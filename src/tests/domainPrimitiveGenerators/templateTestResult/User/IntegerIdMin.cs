using Wepsys.Core;

namespace RI.Novus.Core.Users;

///<summary>Represents User's IntegerIdMin</summary>
public sealed class IntegerIdMin : AbstractPositiveIntegerPrimitive
{
	private static readonly PositiveInteger MinValue = new(12);
	private static readonly PositiveInteger MaxValue = new(100);

	/// <summary>
	/// Creates an instance of <see cref="IntegerIdMin"/>.
	/// <param name="rawValue"></param>
	/// </summary>
	public IntegerIdMin(PositiveInteger rawValue) : base(rawValue, MinValue, MaxValue)
	{
	}

	/// <summary>
	/// Shortcut for constructor <see cref="IntegerIdMin"/>.
	/// <param name="rawIntegerIdMin">Represents a integerIdMin.</param>
	/// <returns>An instance of <see cref="IntegerIdMin"/></returns>
	/// </summary>
	public static IntegerIdMin From(int rawIntegerIdMin) => new(new PositiveInteger(rawIntegerIdMin));

}
